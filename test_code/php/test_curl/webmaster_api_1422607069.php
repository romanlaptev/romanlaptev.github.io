<?php

try{
    $apilead = new CApiLead();
    $lead = $apilead->create(array(
        'name' => 'test name',
        'phone' => 'test phone',
        'country' => 'test country',
        'tz' => 2,
        'address' => 'test address',
    ));

    echo "Order #".$lead->id.". Status ".$lead->status;
}catch (Exception $e) {
    //error handler
    echo $e->getMessage();
}


class CApiLead
{
    public $config = array(
        'api_key' => 'e4fa83b41b923819f40da5838129e9f8',
        'offer_id' => 10,
        'user_id' => 65,
        'stream_id' => 50,
        'create_url' => 'https://apilead.com/api/lead/create',
        'update_url' => 'https://apilead.com/api/lead/update',
    );

    public function create($params)
    {
        $data = array(
            'offer_id'  => $this->config['offer_id'],
            'user_id'   => $this->config['user_id'],
            'stream_id' => $this->config['stream_id'],
            'name'      => $params['name'],    //ФИО
            'phone'     => $params['phone'],   //телефон
            'tz'        => $params['tz'],      //временная зона
            'address'   => $params['address'], //адрес
            'country'   => $params['country'], //страна
            //'utm_source'        => $params['utm_source'],    //utm метки
            //'utm_medium'        => $params['utm_medium'],
            //'utm_campaign'      => $params['utm_campaign'],
            //'utm_term'          => $params['utm_term'],
            //'utm_content'       => $params['utm_content']
        );

        $data['check_sum'] = sha1(
            $this->config['user_id'] .
            $this->config['offer_id'] .
            $this->config['stream_id'] .
            $data['name'] .
            $data['phone'] .
            $this->config['api_key']
        );

        $response = self::post_request($this->config['create_url'], json_encode($data));

        if( $response['httpCode'] == 200 && $response['errno'] === 0 )
        {
            $body = json_decode($response['result']);

            if( json_last_error() === JSON_ERROR_NONE )
            {
                //echo 'Order #'.$body->id.'. Status '.$body->status;
                return $body;
            }
            else
            {
                throw new Exception('JSON response error');
            }
        }
        else
        {
            if( !empty($response['result']) )
            {
                $result = json_decode($response['result']);
                throw new Exception($result->error);
            }
            else
            {
                throw new Exception('HTTP request error. '.$response['error']);
            }
        }
    }

    static function post_request( $url, $data )
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT ,5);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $result = curl_exec($ch);

        $curlError = curl_error($ch);
        $curlErrorNo = curl_errno($ch);
        $httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close ($ch);

        $response = array(
            'error'    => $curlError,
            'errno'    => $curlErrorNo,
            'httpCode' => $httpCode,
            'result'   => $result,
        );

        return $response;
    }
}
