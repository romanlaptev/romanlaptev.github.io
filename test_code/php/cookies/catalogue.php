<?
//echo "catalogue.php";
//echo "<br>";

require_once('ImagesGallery.php');
require_once('analog_products.php');
	
function escapeStr($array) 
{
            // Check if the parameter is an array
            if(is_array($array)) {
                // Loop through the initial dimension
                foreach($array as $key => $value) {
                    // Check if any nodes are arrays themselves
                    if(is_array($array[$key]))
                        // If they are, let the function call itself over that particular node
                        $array[$key] = filterParameters($array[$key]);
               
                    // Check if the nodes are strings
                    if(is_string($array[$key]))
                        // If they are, perform the real escape function over the selected node
                        $array[$key] = mysql_real_escape_string($array[$key]);
                }           
            }
            // Check if the parameter is a string
            if(is_string($array))
                // If it is, perform a  mysql_real_escape_string on the parameter
                $array = mysql_real_escape_string($array);
           
            // Return the filtered result
            return $array;
       
}


class CategoryFilter
{
	public $category_id;
	public $get_filter = array();
	
	
	public $get_filter_flag = array();
	public $get_filter_sp = array();
	public $get_filter_d1 = array();
	public $get_filter_d2 = array();
	  
	  
    public $separator = ' : ';

	public function __construct($category_id)
    {
		$this->category_id = intval($category_id);
		if(isset($_GET['get_filter']))
		{
			$this->get_filter = unserialize( stripslashes( urldecode( $_GET['get_filter'] ) ) );
		}
		
		if(isset($_REQUEST['filter']) && $_REQUEST['filter']==1)	
		{
			$j=0;$k_f=0;
			$i=0;$ii=0;
			//-------------------------списки-----------------------------
			while(isset($_REQUEST['name_1'][$ii]) )
			{ 
				if($_REQUEST['val_1'][$ii]!="")
				{
					$name_1[$i]=escapeStr($_REQUEST['name_1'][$ii]);			
					$val_1[$i]=escapeStr($_REQUEST['val_1'][$ii]);
					$i++;
				}
				$ii++;
			}
			$tt=0;
			$i=0;			
			//-------------------------флажки-----------------------------
			while(isset($_REQUEST['name_2'][$k_f]))
			{
				$name2=escapeStr($_REQUEST['name_2'][$k_f]);
				$k=0;
				if(isset($_REQUEST[$k_f][$k]))
				{
					$flag[$tt][]=$name2;
					while(isset($_REQUEST[$k_f][$k]))
					{
						$name_2[$i]=$name2;	
						$val_2[$i]=escapeStr($_REQUEST[$k_f][$k]);
						$flag[$tt][]=$val_2[$i];
						$i++;$k++;
					}
					$this->get_filter_flag[]=$flag[$tt];	
					$tt++;
				}
				$k_f++;
			}		
			$k_d=0;
			$kk_d=0;
			//-------------------------диапазон-----------------------------
			
			while(isset($_REQUEST['name_3'][$k_d]))
			{
				if(($_REQUEST['val_3'][$k_d]!="" && $_REQUEST['val_3'][$k_d]!=$_REQUEST['valStart_3'][$k_d]) && ($_REQUEST['val_4'][$k_d]!="" && $_REQUEST['val_4'][$k_d]!=$_REQUEST['valStart_4'][$k_d]))
				{
					//$val_3[$kk_d]=floatval($_REQUEST['val_3'][$k_d]);
					$val_3[$kk_d]=str_replace(',','.',$_REQUEST['val_3'][$k_d]);
					$val_4[$kk_d]=str_replace(',','.',$_REQUEST['val_4'][$k_d]);
					
					$name3=$_REQUEST['name_3'][$k_d];	
					
					$name_3[$kk_d]=$name3;			
					$name_4[$kk_d]=$name3;
					$kk_d++;
				}
				else if($_REQUEST['val_3'][$k_d]!="" && $_REQUEST['val_3'][$k_d]!=$_REQUEST['valStart_3'][$k_d])
				{
					$val_3[$kk_d]=str_replace(',','.',$_REQUEST['val_3'][$k_d]);
					$val_4[$kk_d]=1000000;	
					
					$name3=$_REQUEST['name_3'][$k_d];	
					$name_3[$kk_d]=$name3;			
					$name_4[$kk_d]=$name3;
					$kk_d++;
				} 
				
				else if($_REQUEST['val_4'][$k_d]!="" && $_REQUEST['val_4'][$k_d]!=$_REQUEST['valStart_4'][$k_d])
				{
					$val_4[$kk_d]=str_replace(',','.',$_REQUEST['val_4'][$k_d]);
					$val_3[$kk_d]=0;	
					
					$name3=$_REQUEST['name_3'][$k_d];	
					$name_3[$kk_d]=$name3;			
					$name_4[$kk_d]=$name3;
					$kk_d++;
				} 
		
				$k_d++;
				$i++;
			
			}
			//-------------------------наличие на складе-----------------------------
			if(isset($_REQUEST['availability']) )
				$this->avail=(int) $_REQUEST['availability'];
		
		
		
		}
		if(isset($name_3)) $this->get_filter_d1= array_combine($name_3, $val_3);
		if(isset($name_4)) $this->get_filter_d2= array_combine($name_4, $val_4);
		if(isset($name_1)) $this->get_filter_sp= array_combine($name_1, $val_1);
	}

    public function getAvailability()
	{
		$avail = -1;
	//-------------------------наличие на складе-----------------------------
		if(isset($_REQUEST['availability']) && $_REQUEST['availability']!='')
			$avail= (int) $_REQUEST['availability'];
		return $avail;
	}
    
	public function getPrice()
	{

	//-------------------------наличие на складе-----------------------------
		if(isset($_REQUEST['const_st_price']) && isset($_REQUEST['const_end_price']) && ((isset($_REQUEST['start_price']) && $_REQUEST['const_st_price'] != $_REQUEST['start_price']) || (isset($_REQUEST['end_price']) && $_REQUEST['const_end_price'] != $_REQUEST['end_price'])))
			{
				$price[]=(isset($_REQUEST['start_price']) && $_REQUEST['start_price']!="")? str_replace(',','.',$_REQUEST['start_price']):0;
				$price[]=(isset($_REQUEST['end_price']) && $_REQUEST['end_price']!="")? str_replace(',','.',$_REQUEST['end_price']):1000000;
/*
				if ( (isset($_REQUEST['start_price2'])) AND (isset($_REQUEST['end_price2'])) )
				{
					$price[0] = $_REQUEST['start_price2'];
					$price[1] = $_REQUEST['end_price2'];
				}
*/				
				return array('st_price' => $price[0], 'end_price' => $price[1]);
			}
			else return array();
	}
	
	public function getVendor()
	{
		$filter_vendor = array();
	
	//-------------------------наличие на складе-----------------------------
		if(isset($_REQUEST['vendor']))
		{
			foreach($_REQUEST['vendor'] as $vend)
			{
				$vend = (int)str_replace('vendor_','',$vend);
				$filter_vendor[] = $vend;
			}
				
		}
		return $filter_vendor;
			
			
	}
	
	public function getParameters()
	{
	
	}
	
    public function getParams()
    {
        return $this->generateFilter();
    }

	//==========!!!=========================================
    public function generateFilter()
    {
	// получаем все ячейки desc_short таблицы iblock, удовлетворяющие заданным условиям
        $spec = $this->getAllAttribytes();
        
		
		
		
        if(count($spec) == 0)
            return false;
        // выбираем все элементы и их значения, удовлетворяющие заданным условиям
        $params = $this->parseSpecification($spec);
        
        if(count($params) == 0)
            return false;
            
        $params = $this->sortParams($params);
      
        return $params;
    }

	//=========================================================

    public function generateLinks($params)
    {
        if(!is_array($params) || count($params) == 0)
            return false;
            
        $links = array();
        
        foreach($params as $attr => $values)
        {
            foreach($values as $param)
                $links[$attr . '_' . $param] = '?get_filter=' . urlencode( serialize( array_merge($this->get_filter, array($attr => $param)) ) );
        }
        
        return $links;
    }

	public function getLike($attr, $zap=0)
    {

		$price=$this->GetPrice();

		$vendor_filter = $this->getVendor();
//для первоначальной загрузки, когда не использовались фильтры
		if(count($this->get_filter_sp) == 0 && count($this->get_filter_flag) == 0 && count($this->get_filter) == 0 && count($this->get_filter_d1) == 0 && count($price) == 0 && count($vendor_filter) == 0)
		{ 
			if($zap==1) return (-1);
			else return array();
		}
		
		elseif(count($this->get_filter_sp) == 0 && count($this->get_filter_flag) == 0 && count($this->get_filter) == 0 && count($this->get_filter_d1) == 0)
		{ //print();

			if($zap==1) return  (-1);
			else 
			{
			$price_part = ' ';
			//==========================орагнизация цены=======================================
			if(count($price) != 0)
			{
				$price_part = ' (select element_id FROM iblock_price WHERE iblock_elements.id=iblock_price.element_id and iblock_price.price >= "' . mysql_real_escape_string($price[st_price]) . '"  AND iblock_price.price <= "' . mysql_real_escape_string($price[end_price]) . '" ) AND iblock_elements.availability=1 ';
			}
			$vend_part = ' ';
			//==========================орагнизация производителей=======================================
			if(count($vendor_filter) != 0)
			{
				$vendor_filter_str = implode(', ', $vendor_filter);
				if($price_part != ' ') $vend_part = ' AND iblock_elements.id IN ';
				$vend_part .= ' (select element_id FROM iblock_property_values WHERE iblock_elements.id=iblock_property_values.element_id and iblock_property_values.property_id = 1 and iblock_property_values.value in ('.$vendor_filter_str.')) ';
			}
			//print("<br> IN ".$price_part.$vend_part);
			return array('id' => ' IN '.$price_part.$vend_part );
			}
		}
	
		$filter_str = array();
		

			//==========================орагнизация ссылки=======================================
		if(count($this->get_filter) != 0)
		{
			foreach($this->get_filter as $param => $val)
			{
				$filter_str[] = '"' . str_replace('(','[(]',$param) . $this->separator . str_replace('(','[(]',$val) . '"';
			}
			
			
			if($zap==1) return
				' SELECT desc_short FROM iblock_elements WHERE iblock_id=' . (int) $this->category_id . ' AND desc_short != ""  AND  iblock_elements.' .$attr .' REGEXP ' . implode(' AND iblock_elements.' . $attr . ' REGEXP ', $filter_str);
			else return array(
				$attr => ' REGEXP ' . implode(' AND iblock_elements.' . $attr . ' REGEXP ', $filter_str)
				);			
		
		}
	//==========================орагнизация списка=======================================	
       
		if(count($this->get_filter_sp) != 0)
		{
			foreach($this->get_filter_sp as $param => $val)
			{
				$filter_str[] = '"' . str_replace('(','[(]',$param) . $this->separator . str_replace('(','[(]',$val) . '"';
			}
			
			if($zap==1) 
				$zap1= ' iblock_elements.' .$attr . ' REGEXP ' . implode(' AND iblock_elements.' . $attr . ' REGEXP ', $filter_str);
			else $zap1= ' REGEXP ' . implode(' AND iblock_elements.' . $attr . ' REGEXP ', $filter_str) ;				
		
		}		
				
	//==========================орагнизация диапазона=======================================		
		$kol=0;
		$num_d=count($this->get_filter_d1);
	
		if($num_d!= 0)
		{
			foreach($this->get_filter_d1 as $param1 => $val1)
			{
				$name11[] = '"' . str_replace('(','[(]',$param1) .  ' "';
				$val11[] = str_replace('(','[(]',$val1) ;
			}
			foreach($this->get_filter_d2 as $param2 => $val2)
			{
				$name22[] = '"' . str_replace('(','[(]',$param2) .  ' "';
				$val22[] = str_replace('(','[(]',$val2) ;
			}
				
				
			//сюда необходим второй ключ вместо attr (='ID')	
			while($kol < $num_d)
			{ 
				
				$zapp4[]= ' IN ( SELECT id_elements FROM value_desc WHERE id_desc IN (SELECT id FROM type_filter WHERE name LIKE ' . $name11[$kol] . ' AND iblock_id=' . (int) $this->category_id. ') AND value >= ' . intval($val11[$kol]) . '  AND value <= ' . intval($val22[$kol]) . ' ) ';
					
				$kol++;
			}	
			
			if($kol==1) $zap4=$zapp4[0];
			else if($kol>1) $zap4=implode(' AND iblock_elements.id ', $zapp4);
		}		
		
       //==========================орагнизация флажков=======================================
		if(count($this->get_filter_flag) != 0)
		{ 
			$k=0;  
			foreach($this->get_filter_flag as $num)
			{
				$filter_str = array();
				$t=0;
				
				foreach($num as $val)
				{
					if($t==0) $param=$val;
					else $filter_str[] = '"' . str_replace('(','[(]',$param) . $this->separator . str_replace('(','[(]',$val) . '"';
					$t++;
				}
				if($k==0)	$zap2= '( iblock_elements.' . $attr . ' REGEXP ' . implode(' OR iblock_elements.' . $attr . ' REGEXP ', $filter_str) . ' ) ' ;
				else $zap2.= ' AND ( iblock_elements.' . $attr . ' REGEXP  ' . implode(' OR iblock_elements.' . $attr . ' REGEXP ', $filter_str).' ) ';
				$k++;
			}			
		}	
				
		$res="";
		$pr='';
		//добавка к запросу фильтрации по диапазону цен	
		if(count($price) != 0)
		{
	
		
			$pr='  AND iblock_elements.id in (select element_id FROM iblock_price WHERE iblock_elements.id=iblock_price.element_id and iblock_price.price >= "' . mysql_real_escape_string($price[st_price]) . '"  AND iblock_price.price <= "' . mysql_real_escape_string($price[end_price]) . '" ) AND iblock_elements.availability=1 ';
		}
		$vend_part = ' ';
			//==========================орагнизация производителей=======================================
		if(count($vendor_filter) != 0)
		{
			$vendor_filter_str = implode(', ', $vendor_filter);
			$vend_part='  AND iblock_elements.id in (select element_id FROM iblock_property_values WHERE iblock_elements.id=iblock_property_values.element_id and iblock_property_values.property_id = 1 and iblock_property_values.value in ('.$vendor_filter_str.')) ';
		}
	
		if(count($this->get_filter_sp) != 0 && count($this->get_filter_flag) != 0 &&  count($this->get_filter_d1) != 0)
   
			if($zap==1) $res = 'SELECT desc_short FROM iblock_elements WHERE iblock_id=' . (int) $this->category_id . ' AND desc_short != ""  AND ' .$zap1 . ' AND ' . $zap2 . ' AND iblock_elements.id ' . $zap4;
			else  $res=array( $attr => $zap1 . $vend_part . $pr . ' AND ' . $zap2 . ' AND iblock_elements.id ' . $zap4 );	
	
		else
			if(count($this->get_filter_sp) != 0 && count($this->get_filter_flag) != 0 )
				if($zap==1) $res = 'SELECT desc_short FROM iblock_elements WHERE iblock_id=' . (int) $this->category_id . ' AND desc_short != ""  AND ' .$zap1 . ' AND ' . $zap2 ;
				else  $res=array( $attr => $zap1 . $vend_part . $pr . ' AND ' . $zap2 );
	

			else
				if(count($this->get_filter_sp) != 0 && count($this->get_filter_d1) != 0 )
					if($zap==1) $res = 'SELECT desc_short FROM iblock_elements WHERE iblock_id=' . (int) $this->category_id . ' AND desc_short != ""  AND ' .$zap1 . ' AND iblock_elements.id ' . $zap4;
					else $res=array( $attr => $zap1 . $vend_part . $pr . ' AND  iblock_elements.id ' . $zap4 );
	
				else 
					if(count($this->get_filter_sp) != 0 )
						if($zap==1) $res = 'SELECT desc_short FROM iblock_elements WHERE iblock_id=' . (int) $this->category_id . ' AND desc_short != ""  AND ' . $zap1;
						else  $res=array( $attr => $zap1 . $vend_part . $pr  );


					else
						if(count($this->get_filter_flag) != 0 && count($this->get_filter_d1) != 0 )
						{
							if($zap==1) $res = 'SELECT desc_short FROM iblock_elements WHERE iblock_id=' . (int) $this->category_id . ' AND desc_short != ""  AND ' . $zap2 . ' AND iblock_elements.id ' . $zap4;
							else 
							{
								$attr='id';
								$res=array( $attr => $zap4 . $vend_part . $pr . ' AND ' . $zap2 );
							}
         
						}
	
						else 
							if( count($this->get_filter_flag) != 0)
							{
								if($zap==1) $res = 'SELECT desc_short FROM iblock_elements WHERE iblock_id=' . (int) $this->category_id . ' AND desc_short != ""  AND ' . $zap2;
								else 
								{
									$attr="none";
									$res=array( $attr => $zap2 . $vend_part . $pr );
								}
							}
	
	
							else	
								if(count($this->get_filter_d1) != 0) 
								{
									if($zap==1) $res = 'SELECT desc_short FROM iblock_elements WHERE iblock_id=' . (int) $this->category_id . ' AND desc_short != ""  AND iblock_elements.id ' . $zap4;
									else
									{
										$attr='id';
										$res=array($attr => $zap4 . $vend_part . $pr);
									}
	
								}
	
		
		return $res;

    }

	public function sortParams($params)
    {
        foreach($params as & $param)
        {
            sort($param);
        }
        return $params;
    }
    
    public function parseSpecification($spec)
    {
        $res = array();
        
        foreach($spec as $val)
        {
            $data = explode("#", $val);
            foreach($data as $item)
            {
                $str = explode(":", $item, 2);
                
                // Clearing
                if(!isset($str[0]) || empty($str[0]) || !isset($str[1]) || empty($str[1]))
                    continue;
                
                if(!isset($res[trim($str[0])]))
                    $res[trim($str[0])] = array();
                
                if(!in_array(trim($str[1]), $res[trim($str[0])]))
                    $res[trim($str[0])][] = trim($str[1]);
            }
        }
        
        return $res;
    }

	public function getAllAttribytes()
    {
        $query = 'SELECT desc_short FROM iblock_elements WHERE iblock_id=' . (int) $this->category_id . ' AND desc_short != "" ';
        $res = mysql_query($query);
        while(list($elements[]) = mysql_fetch_array($res));
        unset($elements[count($elements) - 1]);
        return $elements;
    }
}

class Reviews
{
    private $required = array(
        'name',
        'valuation',
        'message'

    );
    
    public $errors = array();
    
    public function __construct($element_id)
    {
        $this->element_id = $element_id;
    }
    
    public function getAllReviews()
    {
		$review = array();

		$query = 'SELECT
						name,
						email,
						city,
						valuation,
						theme,
						message,						
						DATE_FORMAT(date, "%d.%m.%Y") as date_f,
						DATE_FORMAT(date, "%Y-%m-%d") as date_schema
					FROM reviews
					WHERE
						element_id=' . (int) $this->element_id . ' AND
						`status` > 0
					ORDER BY `date` DESC';
        $res = mysql_query($query);

        if(mysql_numrows($res) == 0)
            return $review;
            
        while($row = mysql_fetch_assoc($res)) $review[] = $row;		
		

        return $review;
    } 
    
    public function validate($review)
    {
        foreach($review as $field => $value)
        {
            if(in_array($field, $this->required))
            {
                if(empty($value))
                    return false;
            }
        }  
        if(in_array('valuation', $this->required) && !isset($review['valuation']))
		{
			return false;
		}
        return true;
    }
    
    public function addReview($review)
    {
        
		try{
			session_start();
         
            if(!$this->validate($review))
                throw new Exception('Необходимо заполнить все обязательные поля');
            //проверяем правильность ввода капчи    
            if($_POST['secpiccapcha'] != $_SESSION['secpic'] OR !$_SESSION['secpic']) throw new Exception('Ошибка! Код проверки введен не верно. Попробуйте еще раз.');
			
            $query = 'INSERT INTO reviews SET 
                `name` = "' . mysql_real_escape_string($review['name']) . '",

                `city` = "' . mysql_real_escape_string($review['city']) . '",
                `valuation`= "' . (int) $review['valuation'] . '",
                `theme` = "' . mysql_real_escape_string($review['theme']) . '",
                `message` = "' . mysql_real_escape_string($review['message']) . '",
                `element_id` = "' . (int) $this->element_id . '",
                `date` = "' . date("Y-m-d") . '"
            ';
            
            mysql_query($query);
			/*
			if(isset($review['valuation']))
			{
				$sql='SELECT valuation FROM reviews WHERE status=1 AND valuation!=0 AND element_id=' .(int) $this->element_id;
				$result=mysql_query($sql);
				if(mysql_num_rows($result) > 0)
				{	
					$num_vote = mysql_num_rows($result);
					$sum_vote = 0;
					while($vote_res = mysql_fetch_assoc($result))
					{
						$sum_vote += $vote_res['valuation'];
					}
					$new_value=str_replace(',','.',$sum_vote/$num_vote);

					
				}
				else
				{
					$item_data['vote_value']=0;
					$item_data['vote_count']=0;
				}
				$sql='UPDATE iblock_elements SET 
						raiting =   REPLACE("' . mysql_real_escape_string($new_value) . '",",",".") 
					WHERE id=' . $this->element_id;
					mysql_query($sql);
			}
			*/
            /*
			if(isset($review['valuation']))
			{
				//так же заполняем таблицу, содержащую рейтинг
				$sql='SELECT * FROM iblock_elements_vote WHERE element_id=' . $this->element_id;
				$result=mysql_query($sql);

				if(mysql_num_rows($result) > 0)
				{
					$vote_data = mysql_fetch_assoc($result);
					$new_value = ($vote_data['valuation']*$vote_data['count'] + (float)$review['valuation'])/($vote_data['count'] + 1);
					$new_count = $vote_data['count'] + 1;
					

					$sql='UPDATE iblock_elements_vote SET 
						valuation =   REPLACE("' . mysql_real_escape_string($new_value) . '",",","."), 
						count = "' . $new_count . '" 
					WHERE element_id=' . $this->element_id;
					mysql_query($sql);

				}
				else
				{
					
					$sql='INSERT INTO iblock_elements_vote VALUES("' . (int)$this->element_id . '", "' . (int) $review['valuation'] . '", "1")';
					mysql_query($sql);
				
				}
			}
			*/
            return true;
			
        }
        catch(Exception $error)
        {    
            $this->addError($error->getMessage());
            
            return false;
        }

    } 
    
    public function addError($error)
    {
        $this->errors[] = $error;
    }
    
}

class RelatedElements
{
    public $element_id;
    
    public $rel_elements = array();
    public $rel_categories = array();
    
    public $img;
    
    public function __construct($element_id)
    {
        $this->img = new ImagesGallery;
        
        $this->element_id = $element_id;
    }
    
    public function getRelatedElements()
    {
//echo "function getRelatedElements";
//echo "<br>";
		$url_code_region = GetCodeRegion();
/*		
        $query = 'SELECT
				rel.id as rel_id,
				els.id as els_id,
				els.name,
				els.desc_short,
				els.code,
				els.iblock_id,
				price.price,
				price.currency,
				gal.img_big as pic,
				cat.name as cat_name, 
				cat.code as cat_code
            FROM iblock_elements as els INNER JOIN iblock_related_elements as rel
                ON els.id = rel.related_element_id
            LEFT OUTER JOIN iblock_price as price
                ON price.element_id = els.id
            LEFT OUTER JOIN iblock_gallery as gal
                ON gal.element_id = els.id 
			LEFT OUTER JOIN iblock as cat
                ON els.iblock_id = cat.id
            
            WHERE
                rel.element_id = ' . (int) $this->element_id . ' AND 
                rel.related_category_id = 0 AND
                els.active = 1

        ';
*/		
        $query = 'SELECT
				rel.id as rel_id,
				els.id as els_id,
				els.name,
				els.desc_short,
				els.code,
				els.iblock_id,
				price.price,
				price.currency,
				gal.img_big as pic,
				cat.name as cat_name, 
				cat.code as cat_code
            FROM iblock_elements as els INNER JOIN iblock_related_elements as rel
                ON els.id = rel.related_element_id
            LEFT OUTER JOIN iblock_price as price
                ON price.element_id = els.id
            LEFT OUTER JOIN iblock_gallery as gal
                ON gal.element_id = els.id 
			LEFT OUTER JOIN iblock as cat
                ON els.iblock_id = cat.id
            
            WHERE
                rel.element_id = ' . (int) $this->element_id . ' AND 
                rel.related_category_id = 0 AND
                els.active = 1 AND 
				gal.img_big !=""
        ';
//echo $query;
//echo "<br>";

        $res = mysql_query($query);
        while($row = mysql_fetch_assoc($res))
        {
/*
            $pic = $this->getPic($row['pic']);
			if (!file_exists(ltrim($pic,'/'))) $pic = '';
			if (!empty($pic))
			{
				$size = getimagesize(ltrim($pic,'/'));
				if(isset($size[3]))	$sizes = $size[3];
			}
			else
			{
				$sizes = '';
			}
*/
//-------------------------------------------- сгенерировать иконку
			//$img_path = './newfiles/images/thumbs/big/';
			$img_path = './newfiles/images/thumbs/small/';
			if (!is_file($img_path.$row['pic']))
			{
				//$pic = "/image_generate/?img=".$row['pic']."&w=352&h=402&type=big";
				$pic = "/image_generate/?img=".$row['pic']."&w=250&h=250&type=small";
			}
			else
			{
				$pic = $img_path.$row['pic'];
			}
//echo "2.pic == ".$pic;
//echo "<br>";
//-------------------------------------------------------------------

			$new_desc=str_replace(';', ';<br />', $row['desc_short']);
			$new_desc=str_replace('#', ';<br />', $new_desc);
			
			$this->rel_elements[$row['rel_id']] = array(
                'element' => array(
                    'id' => $row['els_id'],
                    //'name' => $row['name'],
                    'name' => substr($row['name'],0,35)."...",
                    'pic' => $pic,
                    'desc_short' => $new_desc,
                    'price' => $row['price'],
                    'link' => $url_code_region.'/'.$row['code'],
					'sizes' =>$sizes,
					'cat_link' => $url_code_region . '/catalogue/' . $row['cat_code'],
					'cat_code' => $row['cat_code'],
                    'cat_name' => $row['cat_name']

                )
            );
        }
        
        $query = 'SELECT rel.id as rel_id, cat.name as cat_name, cat.code as cat_code
            FROM iblock_related_elements as rel
            LEFT OUTER JOIN iblock as cat
                ON rel.related_category_id = cat.id
            WHERE
                rel.element_id = ' . (int) $this->element_id . ' AND
                rel.related_element_id = 0
        ';
        
        $res = mysql_query($query);
        echo mysql_error();
        while($row = mysql_fetch_assoc($res))
        {
            $this->rel_categories[$row['rel_id']]  = array(
                'category' => array(
                   'link' => $url_code_region.'/catalogue/' . $row['cat_code'],
                   'code' => $row['cat_code'],
                   'name' => $row['cat_name']
                )
            );
        }
		
        $sorted_rel_elem = array_merge($this->rel_elements, $this->rel_categories);
        sort($sorted_rel_elem);
		
//echo "sorted_rel_elem = <pre>";
//print_r($sorted_rel_elem);
//echo "</pre>";
        return $sorted_rel_elem;
    }
	
//-------------------------------------- Автоматический подбор сопутствующих  товаров
    public function getRelatedElements2($element_desc_short)
    {
		$test_param_arr=explode("#",$element_desc_short);
//echo "<pre>";
//print_r($this);
//print_r($test_param_arr);
//echo "</pre>";
		$rel_elem2 = array();
		for ($n1=0;$n1<count($test_param_arr);$n1++)
		{
			if (!empty($test_param_arr[$n1]))
			{
				$query = "
-- получить все товары из сопутствующих категорий
SELECT 
iblock_elements.id, 
iblock_elements.iblock_id, 
-- iblock.name as iblock_name, 
iblock_elements.name, 
iblock_elements.code, 
iblock_elements.desc_short,  
iblock_price.price, 
iblock_gallery.img_big 
FROM iblock_elements 
LEFT JOIN iblock_related_elements ON iblock_related_elements.element_id = ".(int) $this->element_id." 
LEFT JOIN iblock_price ON iblock_price.element_id = iblock_elements.id 
LEFT JOIN iblock_gallery ON iblock_gallery.element_id = iblock_elements.id 
-- LEFT JOIN iblock ON iblock.id = iblock_elements.iblock_id 
WHERE 
iblock_elements.iblock_id = iblock_related_elements.related_category_id AND 
iblock_elements.desc_short !=''  AND 
iblock_gallery.img_big !=''  AND 
-- iblock_elements.desc_short REGEXP 'Диаметр диска, мм : 190'
iblock_elements.desc_short REGEXP '".$test_param_arr[$n1]."' 
LIMIT 0,20
;";
//echo $query;
//echo "<br>";
 
				$res = mysql_query($query);
				if (mysql_num_rows($res)>0)
				{
//echo "num_rows =".mysql_num_rows($res);
//echo "<br>";
					while($row = mysql_fetch_assoc($res))
					{
//echo "<pre>";
//print_r($row);
//echo "</pre>";
						//сгенерировать иконку
						$img_path = './newfiles/images/thumbs/big/';
						if (!is_file($img_path.$row['img_big']))
						{
							$row['img_big']="/image_generate/?img=".$row['img_big']."&w=352&h=402&type=big";
						}
						else
							$row['img_big']=$img_path.$row['img_big'];
							
						$rel_elem2[]=$row;
					}
				}
				else
				{
					echo "<font color='red'>В разделе не найден параметр </font>".$test_param_arr[$n1];
					echo "<br>";
				}
				
			}//------------------------ end if
		}//----------------------- end for
		
echo "rel_elem2 = <pre>";
print_r($rel_elem2);
echo "</pre>";
        return $rel_elem2;
    }
//--------------------------------------------------------------------

    
    public function getPic($pic)
    {
//echo "public function getPic, ".$pic;
//echo "<br>";
	
        if(empty($pic))
            return false;
			
        if($this->img->isFile($this->img->thumbPath($pic, true)))
        {
//echo "t2";
//echo "<br>";
            $this->img->saveThumbnail($this->img->originalPath($pic), $this->img->thumbPath($pic), $this->img->smallThumbParams);
        }
        return $this->img->thumbPath($pic, true, true);
    }
}

class PresentElements
{
    public $element_id;
    
    public $pres_elements = array();
   
    
    public $img;
    
    public function __construct($element_id)
    {
        $this->img = new ImagesGallery;
        
        $this->element_id = $element_id;
    }
    
    public function getPresentElements()
    {
		$url_code_region = GetCodeRegion();
        $query = 'SELECT
				pres.id as pres_id,
				els.id as els_id,
				els.name,
				els.html_h1,
				els.desc_short,
				els.code,
				els.iblock_id,
				price.price,
				price.currency,
				gal.img_big as pic,
				cat.name as cat_name, 
				cat.code as cat_code
            FROM iblock_elements as els INNER JOIN iblock_present_elements as pres
                ON els.id = pres.present_element_id
            LEFT OUTER JOIN iblock_price as price
                ON price.element_id = els.id
            LEFT OUTER JOIN iblock_gallery as gal
                ON gal.element_id = els.id 
			LEFT OUTER JOIN iblock as cat
                ON els.iblock_id = cat.id
            
            WHERE
                pres.element_id = ' . (int) $this->element_id . ' AND 
                 els.active = 1

        ';
        
        $res = mysql_query($query);
		 $kk=0;$id_kk=0;
        while($row = mysql_fetch_assoc($res))
        {
			if($kk==0 || $id_kk!=$row['els_id'])
			{
			$pic = $this->getPic($row['pic']);
			
			if (!file_exists(ltrim($pic,'/'))) $pic = '';

			if (!empty($pic))
			{
				$size = getimagesize(ltrim($pic,'/'));
				if(isset($size[3]))	$sizes = $size[3];
				$kk=1; $id_kk=$row['els_id'];
			}
			else
			{
				$sizes = '';
			}
			}
			$new_desc=str_replace(';', ';<br />', $row['desc_short']);
			$new_desc=str_replace('#', ';<br />', $new_desc);
			//print($sizes."<br>");
			$this->pres_elements[$row['pres_id']] = array(
                'element' => array(
                    'id' => $row['els_id'],
                    'name' => $row['name'],
					'html_h1' => $row['html_h1'],
                    'pic' => $pic,
                    'desc_short' => $new_desc,
                    'price' => $row['price'],
                    'link' => $url_code_region.'/'.$row['code'],
					'sizes' =>$sizes,
					'cat_link' => '/catalogue/' . $row['cat_code'],
                    'cat_name' => $row['cat_name']

                )
            );
        }
        sort($this->pres_elements);
        
        return $this->pres_elements;
    }
    
    public function getPic($pic)
    {
//echo "public function getPic(pic)";
//echo "<br>";
//echo "<pre>";
//print_r($pic);
//echo "</pre>";
        if(empty($pic))
            return false;
        //if(!$this->img->isFile($this->img->thumbPath60($pic)))
        if(!$this->img->isFile($this->img->thumbPath141($pic)))
        {
            //$this->img->saveThumbnail($this->img->originalPath($pic), $this->img->thumbPath60($pic), $this->img->small60ThumbParams);
            $this->img->saveThumbnail($this->img->originalPath($pic), 
										$this->img->thumbPath141($pic), 
										$this->img->small141ThumbParams);
        }
        //return $this->img->thumbPath60($pic, true);
        return $this->img->thumbPath141($pic, true);
    }
}


class InstructionFiles
{
    public $element_id;
    public $files = array();
    public $prefix = '/newfiles/files/instructions/';
    
    public function __construct($element_id)
    {
        $this->element_id = intval($element_id);
    }
    
    public function getFiles()
    {
        $query = 'SELECT file FROM iblock_files WHERE element_id=' . (int) $this->element_id;
        $res = mysql_query($query);
        while(list($file) = mysql_fetch_array($res)){
            $this->files[] = $this->prefix . $file; 
        }
        return $this->files;
    }   
}

function ShowCatalogue()
{
	global $smarty, $usubmodule, $umodule, $p1, $p2, $NAVI_STR, $page_divider, $item_link_style;

	$catalogie_prefix = '/catalogue/';
	setlocale (LC_ALL, array ('ru_RU.CP1251', 'rus_RUS.1251'));
	$url_code_region = GetCodeRegion();
    //Если в ссылке есть /catalogue/ то нужно выдать ошибку 404.
    #if ($umodule=='catalogue') Show404Page('ТПРУ-У-У!!!11');    // передать любое значение

	$iblock = new iblock();
	$iblock_element = new iblock_element();

	$price_class = new generic_sql_data('iblock_price');
	$currency_class = new generic_sql_data('currency');
	$cur_items = $currency_class->GetList();
	while ($cur_data = $cur_items->GetData())
	{
		$rates[$cur_data['code']] = $cur_data['rate'];
	}

	$selected_block = $iblock->Get((array('code' => $usubmodule)));

	if ($selected_block['name'] == '' & $usubmodule != '' && !eregi("^\?", $usubmodule) && $usubmodule != 'brand') 
		Show404Page();

		
	//если мы переходим по бренду
    $filter = new CategoryFilter($selected_block['id']);        
    
	//преобразовываем ассоциативный массив в обычный двумерный
	$n_s=0;
	foreach($filter->get_filter_sp as $key=>$value)
	{
		$filter_sp[$n_s][0]=$key;
		$filter_sp[$n_s][1]=$value;
		$n_s++;
	}

	$params = $filter->getParams();
	$n_d=0;
	foreach($filter->get_filter_d1 as $key=>$value)
	{
		$filter_d1[$n_d][0]=$key;
		if($value==0) 
			$filter_d1[$n_d][1]=$params[$key][0];
		else 
			$filter_d1[$n_d][1]=$value;
		$n_d++;
	}
	
	$n_d=0;
	foreach($filter->get_filter_d2 as $key=>$value)
	{
		$filter_d2[$n_d][0]=$key;
		if($value==1000000) 
			$filter_d2[$n_d][1]=$params[$key][count($params[$key])-1];
		else 
			$filter_d2[$n_d][1]=$value;
		$n_d++;
	}

	$smarty->assign('filter_def',$filter->get_filter);
	$smarty->assign('filter_flag',$filter->get_filter_flag);
	$smarty->assign('filter_sp', $filter_sp);
	$smarty->assign('filter_d1', $filter_d1);
	$smarty->assign('filter_d2', $filter_d2);
	

	
	$avail = $filter->getAvailability();
	$price = $filter->getPrice();

	$vendor_filter = $filter->getVendor();
//print_r($vendor_filter);

	//=====	определяем тип филльтра
		
	$sql = "SELECT * FROM type_filter WHERE iblock_id='". (int) $selected_block['id']."' AND active=1 AND name!='Цена'";
	$result = mysql_query($sql);
	while($fil = mysql_fetch_assoc($result)) 
	{
		$filter_data[]=$fil["filter"];
		$name_data[]=trim($fil["name"]);
	}

//echo "filter_data = <pre>";	
//print_r($filter_data);
//echo "<pre>";	
	$smarty->assign('filter_data', $filter_data);
	$smarty->assign('name_data', $name_data);

	if(is_array($filter_data))
	{
		if(in_array(3,$filter_data))
		{
			$def_diap_st=array();
			$def_diap_end=array();
			foreach($filter_data as $key=>$value)
			{
				if ($value!=3) continue;
				else 
				{
					$def_diap_st[]=$params[$name_data[$key]][0];
					$def_diap_end[]=$params[$name_data[$key]][count($params[$name_data[$key]])-1];
				}
			}
			$smarty->assign('def_diap_st',  $def_diap_st);
			
			$smarty->assign('def_diap_end', $def_diap_end);
		}
	}

	//=====================	
	if($avail==-1) 
		$smarty->assign('avail', -1);	
	else 
		$smarty->assign('avail', $avail);

	//определяем максимальную и минимальную цены на текущий блок товаров
	$sql = "
		SELECT 
			max(price) as max_pr, 
			min(price) as min_pr 
		FROM iblock_price 
		WHERE element_id in 
			(
				SELECT 
					id 
				FROM iblock_elements 
				WHERE 
					iblock_id ='". (int) $selected_block['id']."'  
					AND availability=1
			)
	";
	$result = mysql_query($sql);
	while($pr = mysql_fetch_assoc($result)) 
	{
		$max_pr=rtrim(rtrim($pr["max_pr"],'0'),'.');
		$min_pr=rtrim(rtrim($pr["min_pr"],'0'),'.');
		
		$filter_min_max_price[1]=$max_pr;
		$filter_min_max_price[0]=$min_pr;
		
	}

	//print("==>".$max_pr);
//--------------------------------------------------------------
//в некоторых случаях шкалу сделать экспоненциальной, 
//в тех случаях, где минимальное значение будет превышено конечным более чем в 20 раз
	$test_pr = $min_pr * 20;
	if($test_pr < $max_pr)
	{
//echo "test_pr($test_pr) < max_pr($max_pr)";
//echo "<br>";
		$smarty->assign('scale_type', 'logarithmic_scale');
	}
	else
	{
		$smarty->assign('scale_type', 'linear_scale');
	}
//--------------------------------------------------------------
	if(count($price)==0)
	{

		$filter_price[0]=$min_pr;
		$filter_price[1]=$max_pr;
	
	}
	else
	{
		if($price['st_price']==0) $filter_price[0]=$min_pr;
		else $filter_price[0]=$price['st_price'];
	
		if($price['end_price']==1000000) $filter_price[1]=$max_pr;
		else $filter_price[1]=$price['end_price'];
	}
	
		
	$smarty->assign('price_min_max', $filter_min_max_price);
	$smarty->assign('price', $filter_price);

//	print_r($params);

    $smarty->assign('filter_params', $params);
//	print_r($params);
    $smarty->assign('filter_links', $filter->generateLinks($params));
	

	//для новых производителей выбираем идентификатор
	$vendor_id = (isset($_REQUEST['vendor_id']))?(int)$_REQUEST['vendor_id']:'';

	if($usubmodule == 'brand' && $p1!='')
	{
		$sql = "SELECT id FROM iblock_property_values_list WHERE code_url LIKE '". mysql_real_escape_string($p1)."' AND deactive=0 AND property_id=1";
		$result = mysql_query($sql);
		if($vendor_data = mysql_fetch_assoc($result))
		{
			$vendor_id = $vendor_data['id'];
		}
	}
	elseif($p1 == 'brand' && $p2!='')
	{
		$sql = "SELECT id FROM iblock_property_values_list WHERE code_url LIKE '". mysql_real_escape_string($p2)."' AND deactive=0 AND property_id=1";
		$result = mysql_query($sql);
		if($vendor_data = mysql_fetch_assoc($result))
		{
			$vendor_id = $vendor_data['id'];
		}
	}
	

	if ($vendor_id != '')
    {   
    // --- если производитель указан, то выбираем ключевые слова из описания производителя для данной группы        
		if(eregi("^\?", $usubmodule))
		{
			$selected_block['id'] = 0;
		}
		$sql = "SELECT * FROM iblock_vendor_categories_desc WHERE vendor_id='".$vendor_id."' AND iblock_id='". (int) $selected_block['id']."'";
		$result = mysql_query($sql);		

		$desc_cat = "";
		$key_cat = "";
		$title_cat = "";

		while($vendor_cat_desc_data = mysql_fetch_assoc($result))
		{
            $desc_cat = $vendor_cat_desc_data['description'];
			$key_cat = $vendor_cat_desc_data['keywords'];
			$title_cat = $vendor_cat_desc_data['title'];
            $h1_cat = $vendor_cat_desc_data['html_h1'];
            $html_desc = $vendor_cat_desc_data['html_desc'];
		}

		$selected_block['keywords'] = $key_cat;
		$selected_block['title'] = $title_cat;
        $selected_block['html_h1'] = $h1_cat;
        $selected_block['html_desc'] = $html_desc;
        $selected_block['desc_html'] = $desc_cat;
        
        $selected_block['description'] = $html_desc;
		
		if($usubmodule == 'brand') $vendor_str = $usubmodule.'/'.$p1.'/';
		else $vendor_str = '?vendor_id='.$vendor_id;
		$smarty->assign('vendor_str', $vendor_str);
		$sql = 'SELECT * FROM iblock_property_values_list WHERE id="'.$vendor_id.'"
		AND deactive=0';
	
		$result = mysql_query($sql);
		$vendor_data = mysql_fetch_assoc($result);
	}
// --- если производитель не указан, то оставляем ключевые слова в покое, они уже взяты из описания группы

	if ($vendor_data)
		$selected_block['name'] = $selected_block['name'].' '.$vendor_data['value'];

	if (str_replace(' ','', $selected_block['title']) == '' || $selected_block['title'] == $selected_block['name'] ) 
		$selected_block['title'] = 'Интернет-магазин Город Инструмента: '.$selected_block['name'].' - большой выбор, описания, цены, доставка по России';  // Evgeniy: Если в таблице iblock поле 'title' пустое, то в качестве титла выводим поле 'name'

	if ($selected_block['html_desc'] == '') 
		$selected_block['html_desc'] = $selected_block['name'];  // Evgeniy: Если в таблице iblock поле 'html_desc' пустое, то в качестве титла выводим поле 'name'

	if ($selected_block['keywords'] == '') 
		$selected_block['keywords'] = $selected_block['name'];  // Evgeniy: Если в таблице iblock поле 'keywords' пустое, то в качестве титла выводим поле 'name'

    if ($selected_block['html_h1'] == '') 
		$selected_block['html_h1'] = $selected_block['name'];  // Evgeniy: Если в таблице iblock поле 'html_h1' пустое, то в качестве титла выводим поле 'name'

     if ($selected_block['name'] == '') 
	 	$selected_block['name'] = 'Каталог товаров';  

		
	if(isset($_REQUEST['page'])) $show_desc=0;
	else $show_desc=1;
	$smarty->assign('show_desc', $show_desc);

//==================================================================		
	//Использовать теги с микроразметкой schema.org, только для производителя РЕСАНТА
	//$pos = strpos($_SERVER['REQUEST_URI'], "resanta");
	//if ($pos)
	//{
		$site_url = "http://".$_SERVER['SERVER_NAME'];
		$smarty->assign('site_url', $site_url);
		$full_url = $site_url.$_SERVER['REQUEST_URI'];
		$smarty->assign('full_url', $full_url);
	
		$_iblock_element = new _iblock_element();
		//$region_id=1;
		$region_id = $_iblock_element->GetIdRegion();
//echo "region_id = ".$region_id;
//echo "<br>";
	//-------------------------------------------------------------------------------------
		$content_data = $_iblock_element->GetContact($region_id);
//echo "<pre>";
//print_r($content_data);	
//echo "</pre>";
		//Вырезать из текста контактной инф-и, адрес
		$contact_text = strip_tags($content_data['text']);
		$pos_addr = strpos($contact_text, "Адрес:");
		$pos_phone = strpos($contact_text, "Телефоны:");
		$address = substr($contact_text, $pos_addr + 6, (($pos_phone - $pos_addr)-6));
//echo $address;
//echo "<br>";
		$smarty->assign('content_data', $content_data);
		$smarty->assign('address',$address);
	//}
//==================================================================		

	$smarty->assign('header', array(
		'keywords' => strtolower(preg_replace("/[;,.:]+?/", "", $selected_block['keywords'])), 
		'description' => $selected_block['html_desc'], 
		'title' => $selected_block['title']));	
	$smarty->assign('category', $selected_block);

  
	/*-------------------- БЛОК: ВЫВОДИТЬ ПО... --------------------*/

	$div_link_base = MakeUrl(array('divider_type'));

	// число элементов на страницу. 0 - все
	//$dividers = array(10, 20, 30, 0);

	//на страницах каталога без фильтрами, выводим по 8 товаров
	$dividers = array(8, 16, 24, 32, 0);
//echo "params = <pre>";
//print_r($params);
//echo "</pre>";
	if (empty($params))
	{
		//на страницах каталога без фильтров, выводим по 12 товаров
		$dividers = array(12, 24, 36, 0); 
	}

	$session_div = (int) $_SESSION['divider'];
	if (!isset($_SESSION['divider'])) $session_div = 0;

	
	if ($_REQUEST['divider_type'] != '')
	{		
		if (array_key_exists($_REQUEST['divider_type'], $dividers))
		{
			$_SESSION['divider'] = $session_div =  $_REQUEST['divider_type'];
		}
		else $_SESSION['divider'] == 'all';
	}

	$dividers_disp = array();
	foreach($dividers as $key=>$divider_item)
	{
		if ($key == $session_div) $is_selected = 1;
		else $is_selected = 0;

		$divider_disp_name = ($divider_item==0) ? 'Все':$divider_item;

		$dividers_disp[] = array(
					"name"        => $divider_disp_name,
					"link"        => $div_link_base.'divider_type='.$key,
					"is_selected" => $is_selected
			);

	}
 
	$smarty->assign('dividers', $dividers_disp);
	//$smarty->assign('dividers', $dividers_disp);         ????? Alex Shevtsov

	if (!strcmp($session_div, 'all'))
	{
		$divider = 0;
	}
	else
	{
		$divider = $dividers[$session_div];
	}

	/*-------------------- /БЛОК: ВЫВОДИТЬ ПО... --------------------*/

	if (!eregi("[0-9]+", $_REQUEST['page']) || intval($_REQUEST['page']) < 0)
	{
		$page_num = 0;
	}
	else
	{
		$page_num = intval($_REQUEST['page']) * $divider;
	}


	$order_by = 'path';
	$how_to_sort = 'ASC';
 
 
 //получыаенм тип сортировки
	$sort_link_base = MakeUrl(array('sort_by'));

	$sort_by_value = array('raiting', 'number_visited', 'price');

	$sort_by =  $_SESSION['sort_by'];
	if (!isset($_SESSION['sort_by'])) $sort_by = 'price';


	
	if ($_REQUEST['sort_by'] != '')
	{		
		if (in_array($_REQUEST['sort_by'], $sort_by_value))
		{
			$_SESSION['sort_by'] = $sort_by =  $_REQUEST['sort_by'];
		}
		else $_SESSION['sort_by'] = $sort_by = 'price';
	}

	
	if($sort_by == 'price') $how_to_sort = 'ASC';
	else $how_to_sort = 'DESC';
	
	$sort_by_link = array();
	foreach($sort_by_value as $sort_item)
	{
		$sort_by_link[] = $sort_link_base.'sort_by='.$sort_item;
	}

	$smarty->assign('sort_by', $sort_by);
	$smarty->assign('sort_by_link', $sort_by_link);

/*------------------------------------- ВЫВОД популярных производителей ----------------------------------------------*/
	$iblock_vendor =  new iblock();
	$iblock_vendor ->table_name = "iblock_vendor_categories_desc";
	$items=$iblock_vendor->GetList(array('popular' => 1));
	
	$iblock_vendor ->table_name = "iblock_property_values_list";
	while ($item_data = $items->GetData() )
	{
		$vend=$iblock_vendor->Get(array('id' => $item_data['vendor_id']));
		if($vend) 
		{
			if($vend['code_url'] != '') 
				$item_data['link'] = 'brand/'.$vend['code_url'].'/';
			else 
				$item_data['link'] = '?vendor_id='.$item_data['vendor_id'];
			$item_data['name']=$vend['value'];
		}
		else 
			continue;
		$popular_vendors[]=$item_data;
	}
//echo "popular_vendors = <pre>";
//print_r($popular_vendors);
//echo "</pre>";
	$smarty->assign('popular_vendors', $popular_vendors);
/*------------------------------------- /ВЫВОД популярных производителей ---------------------------------------------*/

 
	/*-------------------------------------------------- ВЫБОРКА ДАННЫХ --------------------------------------------------*/
	if (($usubmodule != '' && !eregi("^\?", $usubmodule) && $usubmodule!='brand') && ($p1 == '' || eregi("^\?", $p1) || $p1 == 'brand')) // ВЫВОД ГРУПП В БЛОКЕ
	{
		$id_data = array($selected_block['id']);

		$iblock->RecursiveGetChildIds($selected_block['id'], $id_data);
		
        //print_r($id_data);print("<br>");
		
		/*----------------------- ВЫБИРАЕМ ВСЕХ ПРОИЗВОДИТЕЛЕЙ ДЛЯ ВЫБРАННОЙ ГРУППЫ ------------------------------------------*/
		$sql = 'SELECT iblock_property_values_list.id, iblock_property_values_list.value, iblock_property_values_list.code_url, iblock_vendor_categories_desc.popular FROM iblock_elements
				LEFT JOIN iblock_property_values ON iblock_elements.id=iblock_property_values.element_id
				LEFT JOIN iblock_property_values_list ON iblock_property_values_list.id=iblock_property_values.value
				LEFT JOIN iblock_vendor_categories_desc ON iblock_vendor_categories_desc.vendor_id=iblock_property_values_list.id
				WHERE iblock_property_values.property_id = 1
				AND iblock_property_values_list.deactive=0
				AND iblock_elements.iblock_id IN ('.implode(', ', $id_data).')  AND iblock_elements.active=1 
				GROUP BY iblock_property_values_list.value
				';

				//LEFT JOIN iblock_properties ON iblock_properties.id=iblock_property_values.property_id
		$result = mysql_query($sql);
		
		//$url_code_region = GetCodeRegion();
		
		if(isset($_REQUEST['filter']) && $_REQUEST['filter']==1)
		{
			$cur_url = $_SERVER['REQUEST_URI'];
			
			list($path, $params) = explode('?', $cur_url);
		
			if(strpos($params,'&vendor_id'))
			{	
				list($params, $ven) = explode('&vendor_id', $params);
				 
			}
			/*
			if(strstr($params,'vendor_id'))
			{	
				//list($params, $ven) = explode('vendor_id', $params);
				$vendor_arr = array('&vendor_id='.$_REQUEST['vendor_id'],'vendor_id='.$_REQUEST['vendor_id'].'&','vendor_id='.$_REQUEST['vendor_id']);	
				$params = str_replace($vendor_arr,'',$params);
				 
			}
			*/
			if(strpos($params,'&page'))
			{	
				list($params, $ven) = explode('&page', $params);
				 
			}
			if(isset($_REQUEST['vendor']))
				{
					$vendor_str = '';
					foreach($_REQUEST['vendor'] as $vend)
					{
						$vendor_str .= 'vendor%5B%5D='.$vend.'&';	
					}

					if($vendor_str != '') $params = str_replace($vendor_str,'',$params);
				}
		
			//if($p1 == 'brand') $data['link'] = $url_code_region.$catalogie_prefix.$selected_block['code'].'/brand/'.$p2.'/?'.$params;
			$data['link'] = $url_code_region.$catalogie_prefix.$selected_block['code'].'/?'.$params;
			
		}
		else
		{
			$data['link'] = $url_code_region.$catalogie_prefix.$selected_block['code'].'/';
		}
			
	
		$data['value'] = 'Все';
		
		$selected_vendors_not_popular = array();
		$selected_vendors_popular = array();
		$selected_vendors = array();
		
		$selected_vendors_all = $data;
			
	
		while ($data = mysql_fetch_assoc($result))
		{

			if ($data['id'] == $vendor_id)
				$data['selected'] = 1;

		/*	$sql_popul = "SELECT popular FROM iblock_vendor_categories_desc WHERE vendor_id='".$data['id']."' AND iblock_id='0'";
			$result_popul = mysql_query($sql_popul);
			while ($data_popul = mysql_fetch_assoc($result_popul))
			{
				$data['popular'] = $data_popul['popular'];
			}
			*/			
			//=========================================================================================
			//=========================================================================================
			//==================================задаем ссылку!!========================================
			//$url_code_region = GetCodeRegion();
			
			if(isset($_REQUEST['filter']) && $_REQUEST['filter']==1)
			{

				$cur_url = $_SERVER['REQUEST_URI'];
				list($path, $params) = explode('?', $cur_url);
				
				if(strpos($params,'&vendor_id'))
				{	
					list($params, $ven) = explode('&vendor_id', $params);
					 
				}
			/*
				if(strstr($params,'vendor_id'))
				{	
					//list($params, $ven) = explode('vendor_id', $params);
					$vendor_arr = array('&vendor_id='.$_REQUEST['vendor_id'],'vendor_id='.$_REQUEST['vendor_id'].'&','vendor_id='.$_REQUEST['vendor_id']);	
					$params = str_replace($vendor_arr,'',$params);
					 
				}
					*/
				if(strpos($params,'&page'))
				{	
					list($params, $ven) = explode('&page', $params);
					 
				}
				if(isset($_REQUEST['vendor']))
				{
					$vendor_str = '';
					foreach($_REQUEST['vendor'] as $vend)
					{
						$vendor_str .= 'vendor%5B%5D='.$vend.'&';	
					}

					if($vendor_str != '') $params = str_replace($vendor_str,'',$params);
				}
				if($data['code_url'] != '') 
					$data['link'] = $url_code_region.$catalogie_prefix.$selected_block['code'].'/brand/'.$data['code_url'].'/?'.$params;
				else 
					$data['link'] = $url_code_region.$catalogie_prefix.$selected_block['code'].'/?'.$params.'&vendor_id='.  $data['id'];				
			}
			else
			{
				if($data['code_url'] != '') 
					$data['link'] = $url_code_region.$catalogie_prefix.$selected_block['code'].'/brand/'.$data['code_url'].'/';
				else 
					$data['link'] = $url_code_region.$catalogie_prefix.$selected_block['code'].'/?vendor_id='.$data['id'];	
			}
		
			/*
		foreach($_REQUEST['req_vendor_id'] as $key_vend => $value_vend)
		{
				$req_vend[] = str_replace('/','',$value_vend);
		}
		*/
		
		
		if((!empty($vendor_filter) && in_array($data['id'], $vendor_filter)) || $data['id'] == $vendor_id) $data['select_vendor'] = 1;
		else $data['select_vendor'] = 0;
		
		if($data['popular'] == 1) $selected_vendors_popular[] = $data;
		else $selected_vendors_not_popular[] = $data;
				//$selected_vendors[] = $data;
			
		
		}
		//по требованию заказчика: если нет ни одного популярного производителя - то принимать первые 8-мь за популярные
		if(empty($selected_vendors_popular))
		{
			$kol_vendor = 0;	
			while($kol_vendor < 8 && $kol_vendor < count($selected_vendors_not_popular))
			{
				$selected_vendors_not_popular[$kol_vendor]['popular'] = 1;
				$kol_vendor ++;
			}
			
			$selected_vendors = $selected_vendors_not_popular;
		}
		else $selected_vendors = array_merge($selected_vendors_popular,$selected_vendors_not_popular);
		array_unshift($selected_vendors,$selected_vendors_all);



		$smarty->assign('linkForForm', $url_code_region.'/catalogue/'.$selected_block['code'].'/');
		$smarty->assign('selected_vendors', $selected_vendors);
		
//echo "selected_vendors: <pre>";
//print_r($selected_vendors);
//echo "</pre>";		

		/*----------------------- /ВЫБИРАЕМ ВСЕХ ПРОИЗВОДИТЕЛЕЙ ДЛЯ ВЫБРАННОЙ ГРУППЫ ------------------------------------------*/

//echo "ВЫБИРАЕМ ВСЕХ ПРОИЗВОДИТЕЛЕЙ ДЛЯ ВЫБРАННОЙ ГРУППЫ";
//echo "<br>";

		$filter_getlist = array();
		$filter_getlist['active'] = 1;
		$filter_getlist['iblock_id'] = $id_data;
		if ($avail != -1)
			$filter_getlist['availability'] = $avail;
			
		$filter_getlist = array_merge($filter_getlist, $filter->getLike('desc_short'));
//echo "filter_getlist = <pre>";
//print_r($filter_getlist);
//echo "</pre>";

		if ($vendor_id != '') // ВЫБОРКА ПРОИЗВОДИТЕЛЯ
		{
			//$smarty->assign('do_not_show_vendor', 1);
			
			$smarty->assign('category_vendor', $vendor_data['value']);
			$smarty->assign('header', array('keywords' => strtolower(preg_replace("/[;,.:]+?/", "", $selected_block['keywords'])), 'description' => $selected_block['description'], 'title' => $selected_block['title']));
			$smarty->assign('do_not_show_vendor', 1);

			/*------------------------------- ВЫБИРАЕМ ПОДГРУППЫ ПОД ВЫБРАННОГО ПРОИЗВОДИТЕЛЯ ------------------------------------*/
            /* Внимание, кошмарный алгоритм*/
            /*!
            * \todo ВЫБИРАЕМ ПОДГРУППЫ ПОД ВЫБРАННОГО ПРОИЗВОДИТЕЛЯ. Алгоритм - это полный кошмар.
            */
			$items = $iblock_element->GetList($filter_getlist, array('availability' => 'DESC', $sort_by => $how_to_sort, 'price' => 'ASC', $order_by => $how_to_sort), array('vendor' => array(intval($vendor_id))), 0, 0, false, 'iblock_elements.iblock_id',true);

			while ($data = $items->GetData())
			{
				$groups_arr = array();
				RecursiveGroupArr($data['iblock_id'], $groups_arr, $selected_block['level']);
				$groups_arr = array_reverse($groups_arr);
				for($i = 0; $i < count($groups_arr); $i++)
				{
					if ($groups_arr[$i]['level'] == $selected_block['level'] + 1)
					$out_groups[$groups_arr[$i]['name']] = array($groups_arr[$i]['id'], $groups_arr[$i]['code']);
				}
			}
			// В $out_groups в итоге оказывается список всех подгрупп для текущей открытой группы, содержащих именно выбранного производителя
            
			$items = $iblock_element->GetList($filter_getlist, array('availability' => 'DESC', $sort_by => $how_to_sort, 'price' => 'ASC', $order_by => $how_to_sort), array('vendor' => array(intval($vendor_id))), $page_num, $divider);
	
			/*------------------------------- /ВЫБИРАЕМ ПОДГРУППЫ ПОД ВЫБРАННОГО ПРОИЗВОДИТЕЛЯ ------------------------------------*/
		}
		
		
		else // ВЫВОД ПО УМОЛЧАНИЮ
		{
		

			//$filter_getlist['active'] = 1;
//========================================!!!!то, как товары выводятся без фильтрации
			//$params = $filter->getParams();
/*			
			$items = $iblock_element->GetList($filter_getlist, array(
'availability' => 'DESC', $sort_by => $how_to_sort, 
'price' => 'ASC', $order_by => $how_to_sort, 
'property_vendor_value' => 'ASC'
), false, $page_num, $divider, " AND iblock_property_values_list.deactive=0 ");
*/
			$items = $iblock_element->GetList($filter_getlist, array(
'in_stock' => 'DESC',
'free_shipping' => 'DESC', 
'availability' => 'DESC', $sort_by => $how_to_sort, 
'price' => 'ASC', $order_by => $how_to_sort, 
'property_vendor_value' => 'ASC'
), false, $page_num, $divider, " AND iblock_property_values_list.deactive=0 ");

//'in_stock' => 'DESC', $sort_by => 'DESC',

//echo "how_to_sort = ".$how_to_sort;
//echo "<br>";
//echo "items = <pre>"; 
//print_r($items);
//echo "</pre>";

//print_r(filter_getlist);

		}

	}
	
	
	
	elseif(($usubmodule == '' || eregi("^\?", $usubmodule)) && $p1 == '' || $usubmodule=='brand' && $p1 != '' && ($p2 == '' || eregi("^\?", $p2))) // ВЫВОД ВСЕГО КАТАЛОГА
	{
		#$smarty->assign('category', array('name' => 'Каталог товаров'));
		$smarty->assign('header', array('keywords' => strtolower(preg_replace("/[;,.:]+?/", "", 'Каталог товаров')), 'description' => 'Каталог товаров', 'title' => 'Каталог товаров'));
	
		
		
	
		if ($vendor_id != '') // ВЫБОРКА ПРОИЗВОДИТЕЛЯ
		{
			//$cat_data_desc['name'] = 'Каталог товаров '.$vendor_data['value'];
			//$cat_data_desc['description'] = $selected_block['description'];

			$smarty->assign('category_vendor', $vendor_data['value']);
			$smarty->assign('header', array('keywords' => strtolower(preg_replace("/[;,.:]+?/", "", $selected_block['keywords'])), 'description' => $selected_block['description'], 'title' => $selected_block['title']));
			$smarty->assign('do_not_show_vendor', 1);

			/*------------------------------- ВЫБИРАЕМ ОСНОВНЫЕ ГРУППЫ ПОД ВЫБРАННОГО ПРОИЗВОДИТЕЛЯ ------------------------------------*/

			$items = $iblock_element->GetList(array('active' => 1), array('availability' => 'DESC', $sort_by => $how_to_sort, 'price' => 'ASC', $order_by => $how_to_sort), array('vendor' => array(intval($vendor_id))), 0, 0, false, 'iblock_elements.iblock_id');
				
			while ($data = $items->GetData())
			{
				$groups_arr = array();
				RecursiveGroupArr($data['iblock_id'], $groups_arr, 0);
				$groups_arr = array_reverse($groups_arr);
				for($i = 0; $i < count($groups_arr); $i++)
				{
					if ($groups_arr[$i]['level'] == 0 && !empty($groups_arr[$i]['id']) && !empty($groups_arr[$i]['code']))
					$out_groups[$groups_arr[$i]['name']] = array($groups_arr[$i]['id'], $groups_arr[$i]['code']);
				}
			}
			// В $out_groups в итоге оказывается список всех подгрупп для текущей открытой группы, содержащих именно выбранного производителя
			$items	= $iblock_element->GetList(array('active' => 1), array('availability' => 'DESC', $sort_by => $how_to_sort, 'price' => 'ASC', $order_by => $how_to_sort), array('vendor' => array(intval($vendor_id))), $page_num, $divider);
				
		
		
			/*------------------------------- /ВЫБИРАЕМ ОСНОВНЫЕ ГРУППЫ ПОД ВЫБРАННОГО ПРОИЗВОДИТЕЛЯ ------------------------------------*/
		}
		elseif ($_REQUEST['search_str']) // ПОИСК ПО НАИМЕНОВАНИЮ
		{
			if ($_REQUEST['vendor'])
			{
				$items = $iblock_element->GetList(array(), array('availability' => 'DESC', $sort_by => $how_to_sort, 'price' => 'ASC', $order_by => $how_to_sort), array('vendor' => array(intval($_REQUEST['vendor']))), $page_num, $divider, " active=1 AND ".GetSearchName(escapeStr($_REQUEST['search_str'])).' AND ',true); 
			
			}
			else
			{
			
				$items = $iblock_element->GetList(array_merge(array(), $filter->getLike('desc_short')), array('availability' => 'DESC', $sort_by => $how_to_sort, 'price' => 'ASC', $order_by => $how_to_sort), false, $page_num, $divider, " active=1 AND ".GetSearchName(escapeStr($_REQUEST['search_str'])));
			}
			$smarty->assign('search_str', htmlspecialchars($_REQUEST['search_str']));
		}
		else // ВЫВОД ПО УМОЛЧАНИЮ
		{
			$items = $iblock_element->GetList(array('active' => 1 ), array('availability' => 'DESC', $sort_by => $how_to_sort, 'price' => 'ASC', $order_by => $how_to_sort), false, $page_num, $divider);
		
		}

	}
	if (!isset($total))
	{
		$total = $iblock_element->total;
//--------------------------------------------		
//echo "test ".$_REQUEST['search_str'];
//echo "<br>";
//echo "total ".$total;
//echo "<br>";
		$smarty->assign('total_search', $total);
//--------------------------------------------		
	}
	

	/*-------------------------------------------------- /ВЫБОРКА ДАННЫХ --------------------------------------------------*/


	/*---------------------------------------- ВЫВОД КАРТОЧКИ ТОВАРОВ ---------------------------------------------*/
	
//-------------------------------------------------------	
	session_start();
//echo "SESSION = <pre>";
//print_r($_SESSION);
//echo "</pre>";
//сформировать массив товаров для вывода блока "Вы смотрели"		
	//if (isset($_SESSION['visited_products_id']))
	//{
		$smarty->assign('visited_products_arr', $_SESSION['visited_products_arr']);
	//}
//-------------------------------------------------------	
 
	if ($p1 != '' && eregi("gallery", $p1))
	{
		$CAT_NAVI_STR = array();
		RecursiveNAVIStr($selected_block['id'], $CAT_NAVI_STR);
		$CAT_NAVI_STR = array_reverse($CAT_NAVI_STR, true);
		$NAVI_STR = array_merge($NAVI_STR, $CAT_NAVI_STR);
		ShowProductGallery();
	}
	
	elseif ($p1 != '' && !eregi("^\?", $p1) && $usubmodule!='brand' && $p1!='brand')
	{ 
		$prod_code = str_replace('.html', '', $p1);
		$item_data = $iblock_element->Get(array('code' => $prod_code, 'active' => 1));
//echo "item_data = <pre>";
//print_r($item_data);
//echo "</pre>";
		
		if($item_data['number_visited'] > 0) $item_data['hits'] = 1;
		else $item_data['hits'] = 0;
		//смотрим является товар хитом или нет - для этого выбираем все хиты
		
		$item_data['properties'] = $iblock_element->GetProperties($item_data['id']);
		if (!$item_data['name'])  Show404Page(); // Ничего не найдено
       
        if ($usubmodule) 
        {
			$header_string='http://'.$_SERVER['HTTP_HOST'].'/'.$item_data['code'].'.html';
			Show404Page('ТПРУ-У-У!!');
			die;
			exit;
        }

		$img_block = $iblock->Get(array('id' => $item_data['iblock_id']));
        $item_price = $price_class->Get(array('element_id' => $item_data['id']));
		
//echo "catalogue.php";
//echo "<br>";
//echo "item_data<pre>";
//print_r($item_data);
//echo "</pre>";

		//=======Корректируем цену в соотв. с регионом и производителем========
		$_iblock_element = new _iblock_element();
		$region_id = $_iblock_element->GetIdRegion();
		$item_price['price'] = $_iblock_element->CorrectPriceRegion($region_id, $item_data['properties']['vendor']['value_id'],$item_price['price']);
		//=====================================================================
		
		$cur_data = $currency_class->Get(array('id' => $item_price['currency']));

		$item_data['price_usd'] = ConvertPrice($item_price['price'], $cur_data['code'], 'USD', $rates);
		$item_data['price_rur'] = ConvertPrice($item_price['price'], $cur_data['code'], 'RUR', $rates);

		$item_data['img_big_link'] = '/'.$item_data['img_big'];
		$item_data['gallery_link'] = '/'.$img_block['code'].'/'.$item_data['code'].'-gallery.html';

		$item_data['vendor']  = $item_data['properties']['vendor']['value'];
		
		//получаем оптовую цену
		$item_data['discount_price_usd'] = GetSaleDiscount($item_data['properties']['vendor']['value_id'], $item_data['price_usd']);
		$item_data['discount_price_rur'] = GetSaleDiscount($item_data['properties']['vendor']['value_id'], $item_data['price_rur']);
		//print("<br>=>".$item_price['discount_price_rur']."<=<br>");
		
        $imgGal = new ImagesGallery;
        $imgGal->setElementId($item_data['id']);
//echo "imgGal = <pre>";
//print_r($imgGal);
//echo "</pre>";
        
        if($imgGal->try)
        {      
            $item_data['img_big'] = $imgGal->getMainPic();  
            $item_data['other_images'] = $imgGal->getOtherPics();
//------------------------------------------------------------------- получить ссылки на видео с youtube
			if (isset($imgGal->video))
			{
				//$item_data['main_video'] = $imgGal->video[0]['url']; //начальное видео
				$num_movies = count($imgGal->video);
				for ($n1=0; $n1 < $num_movies; $n1++)
				{
//------------------------- корректировка url видео для youtube
//http://www.youtube.com/watch?v=Lv7cCDBdEJs&feature=plcp на
//http://www.youtube.com/v/Lv7cCDBdEJs
					$text = array("watch?v=", "&feature=plcp","&feature=relmfu");
					$change_text = array("v/", "","");
					$imgGal->video[$n1]['url'] = str_replace($text, $change_text, $imgGal->video[$n1]['url']);

//СсылкиВидео="http://youtu.be/oxFydxYyOq4" 
					$text = array("http://youtu.be/");
					$change_text = array("http://www.youtube.com/v/");
					$imgGal->video[$n1]['url'] = str_replace($text, $change_text, $imgGal->video[$n1]['url']);
					
					$movies[$n1][url] = $imgGal->video[$n1]['url'];
//------------------------------------------------------- thumb
//http://img.youtube.com/vi/MG6WCMjKpYo/0.jpg
//http://www.youtube.com/v/MG6WCMjKpYo
					$text = "www.youtube.com/v";
					$change_text = "img.youtube.com/vi";
					$thumb = str_replace($text, $change_text, $imgGal->video[$n1]['url']);
					$thumb .= "/default.jpg";
					$movies[$n1][thumb] = $thumb;
//-------------------------------------------------------------
				}
				$item_data['video'] = $movies;
			}
//--------------------------------------------------------------------
        }
//echo "<pre>";
//print_r($item_data['video']);
//print_r($item_data['desc_short']);
//echo "</pre>";

		//==============================================================================
		//==============================================================================
        $review = new Reviews($item_data['id']);

        if(isset($_POST['is_review']))
        {
            if(!$review->addReview($_POST['review']))
            {
              
				$smarty->assign('review_value', $_POST['review']);
				$smarty->assign('review_errors', $review->errors);
				
            }
        }
        
        $smarty->assign('reviews', $review->getAllReviews());
        
        $relEls = new RelatedElements($item_data['id']);
        $rel_elements = $relEls->getRelatedElements();

//echo "<pre>";
//print_r($rel_elements);
//echo "</pre>";
		// разделяем сопутствующие товары на категории и продукты
		$rel_products   = array();
		$rel_categories = array();
		foreach ($rel_elements as $rel_item)
		{//print_r($rel_elements);print("<br><br>");
			if(isset($rel_item['element'])) $rel_products[] = $rel_item['element'];
			if(isset($rel_item['category'])) $rel_categories[]  = $rel_item['category'];
		}
		
//echo "<pre>";
//print_r($rel_categories);
//print_r($rel_products);
//echo "</pre>";
        //$smarty->assign('rel_elements', $rel_elements);
        $smarty->assign('rel_products', $rel_products);
        $smarty->assign('rel_categories', $rel_categories);
		
//----------------------------- автоматический подбор сопутствующих  товаров 
        //$rel_elements2 = $relEls->getRelatedElements2($item_data['desc_short']);
//echo "rel_elements2 = <pre>";
//print_r($rel_elements2);
//echo "</pre>";
//echo "count(rel_elements2) = ".count($rel_elements2);
//echo "<br>";
        //$smarty->assign('rel_products2', $rel_elements2);
//----------------------------------------------------------------------------

		if(strstr($_SERVER['QUERY_STRING'],'view_3d') && strstr($_SERVER['HTTP_REFERER'],'catalogue'))  $smarty->assign('view_3d', 1);
		else $smarty->assign('view_3d', 0);
		//==================выборка товаров - подарков==========================
		
		 $presEls = new PresentElements($item_data['id']);
        
        $pres_elements = $presEls->getPresentElements();

		// разделяем сопутствующие товары на категории и продукты
		$pres_products   = array();
		
		foreach ($pres_elements as $pres_item)
		{//print_r($rel_elements);print("<br><br>");
			if(isset($pres_item['element'])) $pres_products[] = $pres_item['element'];
		}
//print_r($pres_elements);
        //$smarty->assign('rel_elements', $rel_elements);
		
        $smarty->assign('pres_products', $pres_products);
		
		//======================================================================
        //=================выборка аналогичных товаров по цене==================
		
		$analogEls = new AnalogElements($item_data['id'],$item_data['price_rur'],$item_data['iblock_id']);
        $analog_elements = $analogEls->getAnalogElementsByPrice();
		
		$analogElsDesc = new AnalogElements($item_data['id'],$item_data['price_rur'],$item_data['iblock_id']);
		$analog_elements_by_desc = $analogElsDesc->getAnalogElementsByDesc();
//print_r($analog_elements);
        $smarty->assign('analog_elements', $analog_elements);
		$smarty->assign('analog_elements_by_desc', $analog_elements_by_desc);
		
		//======================================================================
		//print_r($analog_elements);
		
        $files = new InstructionFiles($item_data['id']);
        
        $smarty->assign('files', $files->getFiles());

        $parametres = explode('#', $item_data['desc_short']);
        $table_parametres = array();
        foreach ($parametres as $v)
        {
			$name_val = explode(':', $v);
			//получаем описание характеристики
			$sql='SELECT description FROM type_filter WHERE iblock_id = "'.$item_data['iblock_id'].'" AND name = "'.mysql_real_escape_string($name_val[0]).'"';
			$result=mysql_query($sql);
			if($res=mysql_fetch_assoc($result))
			{
				$name_val[2] = $res['description'];
			}
			if($v != '') $table_parametres[] = $name_val;
			unset($name_val);
		}

		$item_data['desc_short'] = $table_parametres;
		
        $table_complete_set = explode('#', $item_data['complete_set']);
        $table_complete_set = explode('<br />', $item_data['complete_set']);
        $not_empty = array();
        foreach ($table_complete_set as $v)
        {
        	if ($v != '')
			{
//echo "v = ".htmlspecialchars($v);
//echo "<br>";
        		$not_empty[] = trim($v);
			}
        }
        $item_data['complete_set'] = $not_empty;
//echo "item_data['complete_set'] = <pre>";        
//print_r($item_data['complete_set']);
//echo "</pre>";        

		//определяем, является товар новинкой или нет
		$sql='SELECT value FROM other_properties WHERE name="time_for_new"';
		$result=mysql_query($sql);
		if(mysql_num_rows($result) > 0)
		{
			$res=mysql_fetch_assoc($result);	
			$time_for_new=$res['value'];
		}
		else 
		{
			$time_for_new=31;
		}
		//выделяем отдельно дату и время
		$date_time=explode(' ',$item_data['date_create']);
		//выделяем день, месяц, год
		$d_m_y=explode('-',$date_time[0]);
		//выделяем час, минуты, секунды
		$h_m_s=explode(':',$date_time[1]);
		//получаем временную метку даты создания товара
		$date1=mktime($h_m_s[0],$h_m_s[1],$h_m_s[2],$d_m_y[1],$d_m_y[2],$d_m_y[0]);
		//получаем временную метку даты, когда товар перестанет быть новинкой (считаем через месяц)
		$date1=$date1+(60*60*24*$time_for_new);
		//определяем временную метку текущего дня
		$date2=time();

		//определяем является ли еще товар новинкой или нет
		if($date1>$date2) $item_data['is_new']=1;
		else $item_data['is_new']=0;

/////////////////////////выбираем изображение гарантии
		$sql='SELECT guarantee FROM iblock_property_values_list WHERE id in (SELECT value FROM iblock_property_values WHERE element_id = ' . $item_data['id'] . ')';
		$result=mysql_query($sql);
		if(mysql_num_rows($result) > 0)
		{
			$res=mysql_fetch_assoc($result); 
			if(isset($res['guarantee']))		
				$item_data['img_gar']='/newfiles/guarantee/originals/'.$res['guarantee'];
		}	

		//заполняем таблицу с логами посещений товаров (для получения хитов продаж)
		SetVisitProduct($item_data['id']);
//echo "<pre>";
//print_r($item_data);
//echo "</pre>";
//------------------------------------------------------- сохранить данные товара для вывода блока "Вы смотрели"		
		$is_exist=0;
		for ($n1=0; $n1<count($_SESSION['visited_products_arr']); $n1++)
		{
			if ($item_data['id'] == $_SESSION['visited_products_arr'][$n1]['id'])
			{
//echo $n1."visited_products_arr']['id'][$n1] = ".$_SESSION['visited_products_arr']['id'][$n1];
//echo "<br>";
				$is_exist=1;
			}
		}
		if ($is_exist == 0) //если просмотренного товара еще нет в массиве, то занести
		{
			$_SESSION['visited_products_arr'][$n1]['id'] = $item_data['id'];
			$_SESSION['visited_products_arr'][$n1]['name'] = $item_data['name'];
			$_SESSION['visited_products_arr'][$n1]['shortname'] = $item_data['shortname'];
			$_SESSION['visited_products_arr'][$n1]['code'] = $item_data['code'];
			$_SESSION['visited_products_arr'][$n1]['img'] = $item_data['img_big']['small'];
/*
    [img_big] => Array
        (
            [thumb] => /newfiles/images/thumbs/big/00000033164_SGC-4100.jpg
            [original] => /newfiles/images/originals/00000033164_SGC-4100.jpg
            [small] => /newfiles/images/thumbs/small/00000033164_SGC-4100.jpg
*/			
			$_SESSION['visited_products_arr'][$n1]['price_rur'] = $item_data['price_rur'];
			$_SESSION['visited_products_arr'][$n1]['raiting'] = $item_data['raiting'];
		}
//-------------------------------------------------------	
	
		//получаем данные о голосах
/*
		$sql='SELECT valuation FROM reviews WHERE status=1 AND valuation!=0 AND element_id=' . $item_data['id'];
		$result=mysql_query($sql);
		if(mysql_num_rows($result) > 0)
		{	
			$num_vote = mysql_num_rows($result);
			$sum_vote = 0;
			while($vote_res = mysql_fetch_assoc($result))
			{
				$sum_vote += $vote_res['valuation'];
			}
			$item_data['vote_value']=str_replace(',','.',$sum_vote/$num_vote);

			$item_data['vote_count']=$num_vote;
		}
		else
		{
			$item_data['vote_value']=0;
			$item_data['vote_count']=0;
		}
*/
		if(isset($item_data['weight_brutto']) && $item_data['weight_brutto'] != '' && $item_data['weight_brutto'] > 0)
			$item_data['res_weight'] =$item_data['weight_brutto'];
	
		$smarty->assign('product_data', $item_data);
		$smarty->assign('content', 'product');
		
		
		//получаем список регионов, в которые призводится доставка по ems
		$ems_region_data = emsGetRegions();
		$smarty->assign('ems_region_data', $ems_region_data);
		/*
		//получаем информацию о сроках и стоимости доставки ems
		$ems_region_info = emsInfoOrder($item_data['weight']);
		if($ems_region_info["min_time"] != $ems_region_info["max_time"]) $ems_region_info["time"] = $ems_region_info["min_time"]."-".$ems_region_info["max_time"];
		else $ems_region_info["time"] = $ems_region_info["min_time"];
		$smarty->assign('ems_region_info', $ems_region_info);
		*/
		
		if (isset($_GET['print']))
		{
			$smarty->display('product_print.tpl');
			die();
		}

		// Навигация

		$CAT_NAVI_STR = array();
		RecursiveNAVIStr($img_block['id'], $CAT_NAVI_STR);
		$CAT_NAVI_STR = array_reverse($CAT_NAVI_STR, true);

		$NAVI_STR = array_merge($NAVI_STR, $CAT_NAVI_STR);

		//if ($item_data['title'] == '')                 // Evgeniy: Если в таблице iblock поле 'title' пустое,
			//$item_data['title'] = $item_data['name'];  //          то в качестве титла выводим поле 'name'

//================================= во всех карточках товара выводить автоматический тайтл
// за основу брать "Наименование товара" и добавить " - купить в интернет магазине Город Инструмента"
		$item_data['title'] = $item_data['shortname']. " - купить в интернет магазине Город Инструмента";
//=================================
			
		//if ($item_data['html_desc'] == '')                 // Evgeniy: Если в таблице iblock поле 'html_desc' пустое,
			//$item_data['html_desc'] = $item_data['name'];  //          то в качестве титла выводим поле 'name'

//================================= во всех карточках товара выводить автоматический денскрипшен
//"Краткое наименование" - оптом и в розницу с доставкой по Москве и России по самой выгодной цене. Подробное описание, технические // характеристики, обзор, отзывы покупателей, фото и видео, консультация специалистов, скидки.
//если краткое наименование отсутствует, выводить просто "Наименование товара"
		$item_data['html_desc'] = " - оптом и в розницу с доставкой по Москве и России по самой выгодной цене. Подробное описание, технические характеристики, обзор, отзывы покупателей, фото и видео, консультация специалистов, скидки.";
		//if (!empty($item_data['shortname']))
		if (!empty($item_data['smallname']))
		{
			//$item_data['html_desc'] = $item_data['shortname'].$item_data['html_desc'];
			$item_data['html_desc'] = $item_data['smallname'].$item_data['html_desc'];
		}
		else
		{
			//$item_data['html_desc'] .= $item_data['name'].$item_data['html_desc'];
			$item_data['html_desc'] = $item_data['shortname'].$item_data['html_desc'];
		}
//=================================
	
		if ($item_data['keywords'] == '')                 // Evgeniy: Если в таблице iblock поле 'keywords' пустое,
			$item_data['keywords'] = $item_data['name'];  //          то в качестве титла выводим поле 'name'
			
//================================= в h1 вывести "Наименование товара" (shortname)
//echo "<pre>";
//print_r($item_data);
//echo "</pre>";
		$$item_data['html_h1'] = $$item_data['shortname'];
//=================================

		
		$smarty->assign('header', array('keywords' => strtolower(preg_replace("/[;,.:]+?/", "", $item_data['keywords'])), 'description' => $item_data['html_desc'], 'title' => $item_data['title']));

        $iblock_data = $iblock->Get(array('id'=>$item_data['iblock_id']));
        $usubmodule = $iblock_data['code'];

	}
	/*---------------------------------------- /ВЫВОД КАРТОЧКИ ТОВАРОВ ---------------------------------------------*/

	/*---------------------------------------- ВЫВОД СПИСКА ТОВАРОВ ---------------------------------------------*/

	//vendor_id
	
	
	elseif ($p1 == '' || eregi("\?", $p1) || ($usubmodule=='brand' && $p1 != '' && ($p2 == '' || eregi("\?", $p2))) || ($p1=='brand' && $p2 != '' && ($p3 == '' || eregi("\?", $p3))))
	{ 
		if (!$total) 
			$smarty->assign('not_found_message', 'Не найдено ни одного товара.');
		/*--------------------------- ВЫВОД ГРУПП -----------------------------*/

		if(!$_REQUEST['search_str'])
		{
			if ($vendor_id != '' ) // Если выбран производитель
			{
				if (is_array($out_groups))
				{
					ksort($out_groups);
					
					foreach ($out_groups as $name => $group_data_arr)
					{//print('1');
						list($id, $code) = $group_data_arr;

						$group_data['name'] = $name;
						$group_data['code'] = $code;
						if($usubmodule == 'brand' && $p1 != '')
							$group_data['link'] = $url_code_region.$catalogie_prefix.$group_data['code'].'/brand/'.mysql_real_escape_string($p1).'/';
						elseif($p1 == 'brand' && $p2 != '') 
							$group_data['link'] = $url_code_region.$catalogie_prefix.$group_data['code'].'/brand/'.mysql_real_escape_string($p2).'/';
						else
							$group_data['link'] = $url_code_region.$catalogie_prefix.$group_data['code'].'/?vendor_id='.intval($vendor_id);

						$id_data = array($id);
						$iblock->RecursiveGetChildIds($id, $id_data);
						$sql = 'SELECT count(iblock_elements.id) as quant FROM iblock_elements
							LEFT JOIN iblock_property_values ON iblock_elements.id=iblock_property_values.element_id
							LEFT JOIN iblock_property_values_list ON iblock_property_values.value=iblock_property_values_list.id
							LEFT JOIN iblock ON iblock.id=iblock_elements.iblock_id
							WHERE iblock_property_values_list.deactive=0 AND iblock_elements.iblock_id IN ('.implode(', ', $id_data).')
							AND iblock_property_values.property_id = 1 AND iblock_elements.active=1 AND iblock_property_values.value IN ('.intval($vendor_id).')';
						//LEFT JOIN iblock_properties ON iblock_properties.id=iblock_property_values.property_id
						//iblock_properties.code="vendor"
						//echo $sql."<BR>--------------------<BR>";
						$count_res = mysql_query($sql);
					
						if(mysql_num_rows($count_res) > 0)
						{
						  $c_data = mysql_fetch_assoc($count_res);
						}
						$group_data['quant'] = $c_data['quant'];
						$group_data['count'] = $c_data['quant'];
						$groups[] = $group_data;

					}
				}
			}
			else // Все остальные случаи
			{	
				if ($usubmodule != '' && !eregi("\?", $usubmodule))
				$group_items = $iblock->GetList(array('parent_id' => $selected_block['id'], 'level' => $selected_block['level'] + 1), array('name' => 'ASC'));
				elseif ($usubmodule == '' || eregi("\?", $usubmodule))
				$group_items = $iblock->GetList(array('parent_id' => $selected_block['id'], 'level' => 0), array('name' => 'ASC'));
				while ($group_data = $group_items->GetData())
				{
					$id_data = array($group_data['id']);
					$iblock->RecursiveGetChildIds($group_data['id'], $id_data);
					//RecursiveGetChildParentIds
					/*
					$req_vendor_str_query = '';
					// если указан массив производителей (это из фильтров по производителям)
					if(isset($_REQUEST['req_vendor_id']) && !empty($_REQUEST['req_vendor_id']))
					{
						$req_vendor_str = implode(', ',$_REQUEST['req_vendor_id']);
						$req_vendor_str_query = ' AND iblock_property_values.property_id = 1 AND iblock_property_values.value IN ('.$req_vendor_str.')';
					}
					*/
					$sql = 'SELECT count(iblock_elements.id) as quant FROM iblock_elements
					LEFT JOIN iblock_property_values ON iblock_elements.id=iblock_property_values.element_id
					LEFT JOIN iblock_property_values_list ON iblock_property_values.value=iblock_property_values_list.id
					WHERE iblock_property_values_list.deactive=0 AND iblock_elements.active=1 AND iblock_elements.iblock_id IN ('.implode(', ', $id_data).')';
					$count_res = mysql_query($sql);
					$c_data = mysql_fetch_assoc($count_res);

					$group_data['quant'] = $c_data['quant'];
					$group_data['link'] = $url_code_region.$catalogie_prefix.$group_data['code'].'/';
					$groups[] = $group_data;

				}
			}

			// удаляем пустые группы( с count=0	)
			if(!empty($groups))
			{
				foreach ($groups as $gr_key=>$gr_item)
					if ($gr_item['count']==0)
						unset($groups[$gr_key]);
			}
			$smarty->assign('groups', $groups);
		}

		$CAT_NAVI_STR = array();
		RecursiveNAVIStr($selected_block['id'], $CAT_NAVI_STR);
		$CAT_NAVI_STR = array_reverse($CAT_NAVI_STR, true);

//echo "CAT_NAVI_STR = <pre>";
//print_r($CAT_NAVI_STR);
//echo "</pre>";

		$NAVI_STR = array_merge($NAVI_STR, $CAT_NAVI_STR);

		/*--------------------------- /ВЫВОД ГРУПП -----------------------------*/
		$temp_gr_name = '';
        /*
		//смотрим является товар хитом или нет - для этого выбираем все хиты - ОДИН РАЗ на весь список!
		$hits_array = array();
		$items_hits = $iblock_element->GetList_hits();
		while ($item_data_hits = $items_hits->GetData())
		{
			$hits_array[] = $item_data_hits['id'];
		}
		*/
		
		$imgGal = new ImagesGallery;
		while ($item_data = $items->GetData())
		{
//echo "<pre>";
//print_r($item_data);
//echo "</pre>";
		//смотрим есть у нас текущий товар среди хитов или нет
		/*
			if(in_array($item_data['id'], $hits_array)) $item_data['hits'] = 1;
			else $item_data['hits'] = 0;
		*/
			if($item_data['number_visited'] > 0) $item_data['hits'] = 1;
			else $item_data['hits'] = 0;
			
			
			
			$properties = $iblock_element->GetProperties($item_data['id']);
			
			$item_price = $price_class->Get(array('element_id' => $item_data['id']));
			//=======Корректируем цену в соотв. с регионом и производителем========
			$_iblock_element = new _iblock_element();
			$region_id = $_iblock_element->GetIdRegion();
			$item_price['price'] = $_iblock_element->CorrectPriceRegion($region_id, $properties['vendor']['value_id'],$item_price['price']);
			//=====================================================================
			
			$cur_data = $currency_class->Get(array('id' => $item_price['currency']));

			

			$item_data['price_rur'] = ConvertPrice($item_price['price'], $cur_data['code'], 'RUR', $rates);

			$img_block = $iblock->Get(array('id' => $item_data['iblock_id']));
			
			//==================================================
			//==================================================
			$imgGal->setElementId($item_data['id'],true);
			
			if($imgGal->try)
			{         
				$im = $imgGal->getSmallPics();
				$item_data['img_small']=$im;
			
			}
		
			unset($img_block);
			$table_desc_short = explode('#', $item_data['desc_short']);
        	$not_empty = array();
        	foreach ($table_desc_short as $v)
        	{
        		if ($v == '') continue;
				$not_empty[] =  explode(':',trim($v));
        	}
         	//$item_data['desc_short'] = implode('.<br> ', $not_empty);
         	$item_data['desc_short'] = $not_empty;

		//	$url_code_region = GetCodeRegion();
			
			$selected_block = $iblock->Get(array('id' => $item_data['iblock_id']));
            //Задание ссылки на товар - с /catalogue/ или очень ЧПУ
            if ($item_link_style == ILS_ITEM_NAME_ONLY)
            {
				$item_data['link'] = $url_code_region.'/'.$item_data['code'].'.html';
            }
            else
            {
                $item_data['link'] = $url_code_region.'/catalogue/'.$selected_block['code'].'/'.$item_data['code'].'.html';
            }
			$item_data['vendor']  = $properties['vendor']['value'];
			//print_r($properties['vendor']['value_id'] );

			/*--------------------------- ПРИНАДЛЕЖНОСТЬ К ГРУППЕ -----------------------------*/
			$groups_arr = array();
			RecursiveGroupArr($item_data['iblock_id'], $groups_arr, $selected_block['level'] + 1);
			$groups_arr = array_reverse($groups_arr);
			$group_name = $groups_arr[0]['name'];
			if ($temp_gr_name != $group_name)
			{
				$item_data['group_name'] = $group_name;
				$temp_gr_name = $group_name;
			}
			/*--------------------------- /ПРИНАДЛЕЖНОСТЬ К ГРУППЕ -----------------------------*/

			//определяем, является товар новинкой или нет
			//выделяем отдельно дату и время
			$date_time=explode(' ',$item_data['date_create']);
			$d_m_y=explode('-',$date_time[0]);
			//выделяем час, минуты, секунды
			$h_m_s=explode(':',$date_time[1]);
			
			//получаем временную метку даты создания товара
			$date1=mktime($h_m_s[0],$h_m_s[1],$h_m_s[2],$d_m_y[1],$d_m_y[2],$d_m_y[0]);

			//получаем временную метку даты, когда товар перестанет быть новинкой (считаем через месяц)
			$date1=$date1+(60*60*24*31);
				
			//определяем временную метку текущего дня
			$date2=time();

			//определяем является ли еще товар новинкой или нет
			if($date1>$date2) $item_data['is_new']=1;
			else $item_data['is_new']=0;

			//получаем оптовую цену
			$item_data['discount_price_usd'] = GetSaleDiscount($properties['vendor']['value_id'], $item_data['price_usd']);
			$item_data['discount_price_rur'] = GetSaleDiscount($properties['vendor']['value_id'], $item_data['price_rur']);

			/*
			$sql='SELECT valuation FROM reviews WHERE status=1 AND valuation!=0 AND element_id=' . $item_data['id'];
			$result=mysql_query($sql);
			if(mysql_num_rows($result) > 0)
			{	
				$num_vote = mysql_num_rows($result);
				$sum_vote = 0;
				while($vote_res = mysql_fetch_assoc($result))
				{
					$sum_vote += $vote_res['valuation'];
				}
				$item_data['vote_value']=str_replace(',','.',$sum_vote/$num_vote);

				$item_data['vote_count']=$num_vote;
			}
			else
			{
				$item_data['vote_value']=0;
				$item_data['vote_count']=0;
			}
			*/
			//определяем какие товары находятся уже в сравнении
			$item_data['in_compare'] = 0;
			
			

			if(isset($_SESSION['compare_product'][$selected_block['primogenitor_id']]))
			{
				if(in_array($item_data['id'],$_SESSION['compare_product'][$selected_block['primogenitor_id']])) $item_data['in_compare'] = 1;
				
			}
		//	print($item_data['in_compare']."<br>");
		
			//выбираем отзывы
			$review = new Reviews($item_data['id']);
			$item_data['reviews_count'] = count($review->getAllReviews());
	
			
			$product_data[] = $item_data;
		}

		// отфильтровываем несуществующие картинки и проставляем размеры существующих
		if (!empty($product_data))
		{
			foreach($product_data as $data_key=>$data_val)
			{
				if (empty($data_val['img_small'])) continue;
				
	
			}
		}
		
		$count_selected_compare = 0;
		if(!empty($_SESSION['compare_product'][$selected_block['primogenitor_id']]))
		{
			$count_selected_compare = count($_SESSION['compare_product'][$selected_block['primogenitor_id']]);
		}
//-------------------------------------------------		
		//Необходимо настроить обработку страниц каталога таким образом, 
		//чтобы страницы без товаров (/catalogue/?vendor_id=308&page=155) отдавали ответ «404 Not Found».
		if(count($product_data) == 0) 
		{
			if (empty($_REQUEST['search_str']))
			{
				$pos1 = strpos($_SERVER['REQUEST_URI'], "/catalogue/?vendor_id=");
				if ($pos1 >= 0)
				{
					$pos2 = strpos($_SERVER['REQUEST_URI'], "&page=");
					if ($pos1 >= 0)
					{
						Show404Page();
					}
				}
			}
		}
//-------------------------------------------------		

		$smarty->assign('count_selected_compare', $count_selected_compare);
//echo "count_selected_compare = ".$count_selected_compare;
//echo "<br>";

		$smarty->assign('product_data', $product_data);
//echo "product_data = <pre>";
//print_r($product_data);
//echo "</pre>";
		$smarty->assign('content', 'products_list');
		
		if ($vendor_id != '' && $usubmodule != 'brand' && $p1 != 'brand')
			$smarty->assign('vendor_id', intval($vendor_id));
		
		$smarty->assign('products_count', $items->NumRows());

		// Ссылки на страницы
		$REQUEST_URI = $_SERVER['REQUEST_URI'];
		$smarty->assign('pages', MakePageLinks(MakeUrl(array('page')), $total, $divider, intval($_REQUEST['page']),''));
	
		//===============================задаем ссылку для сброса значений фильтра
		
		$url_reset=explode('?',$_SERVER['REQUEST_URI']);
		
		$smarty->assign('url_reset', $url_reset[0]);
	}
	/*---------------------------------------- /ВЫВОД СПИСКА ТОВАРОВ ---------------------------------------------*/

}

function ShowProductGallery()
{
	global $p1, $smarty, $NAVI_STR;


	$smarty->assign('content', 'product_gallery');
	$iblock_gallery = new iblock_gallery();
	$iblock_element = new iblock_element();
	$iblock = new iblock();

	$prod_code = str_replace('.html', '', $p1);
	$prod_code = str_replace('-gallery', '', $prod_code);

	$element_data = $iblock_element->Get(array('code' => $prod_code, 'active' => 1));
	$block_data = $iblock->Get(array('id' => $element_data['iblock_id']));

	$NAVI_STR[] = array($element_data['name'] => '/catalogue/'.$block_data['code'].'/'.$element_data['code'].'.html');
	$NAVI_STR[] = array('Галерея' => '');
	$smarty->assign('gallery_name', 'Галерея изображения для '.$element_data['name']);

	$block_code = $block_data['code'];
	$element_id = $element_data['id'];
	unset($element_data);
	unset($block_data);

	$items = $iblock_gallery->GetList(array('element_id' => $element_id));
	while ($data = $items->GetData())
	{
		$data['img_big_link'] = 'files/'.$block_code.'/gallery/'.$data['img_big'];
		$data['img_small_link'] = '/files/'.$block_code.'/gallery/'.$data['img_small'];

		list($width, $height) =  getimagesize ($data['img_big_link']);

		$data['img_big_link'] = '/'.$data['img_big_link'];
		$data['width'] = $width;
		$data['height'] = $height;
		$gallery_data[] = $data;
	}
	$smarty->assign('gallery_data', $gallery_data);
}

function RecursiveNAVIStr($id, &$NAVI_ARR)
{
	$url_code_region = GetCodeRegion();
	$sql = 'SELECT * FROM iblock WHERE id="'.intval($id).'"';
	$result = mysql_query($sql);

	if (mysql_num_rows($result) < 1) return;

	$data = mysql_fetch_assoc($result);
	$NAVI_ARR[] = array($data['name'] => $url_code_region."/catalogue/{$data['code']}/");

	RecursiveNAVIStr($data['parent_id'], &$NAVI_ARR);
}

function RecursiveGroupArr($id, &$GROUPS_ARR, $lvl_threshold)
{
	//LEFT JOIN iblock_elements ON iblock.id=iblock_elements.iblock_id
	//LEFT JOIN iblock_property_values ON iblock_elements.id=iblock_property_values.element_id
	//LEFT JOIN iblock_property_values_list ON iblock_property_values.value=iblock_property_values_list.id
	//AND iblock_property_values_list.deactive=0
	$sql = 'SELECT iblock.* FROM iblock
	WHERE id="'.intval($id).'" ';
	$result = mysql_query($sql);

	$data = mysql_fetch_assoc($result);
	$GROUPS_ARR[] = array('id' => $data['id'], 'code' => $data['code'], 'name' => $data['name'], 'level' => $data['level']);

	if ($data['level'] > $lvl_threshold)
	RecursiveGroupArr($data['parent_id'], &$GROUPS_ARR, $lvl_threshold);
	else return;
}

function GetSearchName($words)
{
//echo "function GetSearchName";
//echo "<br>";
        $words = trim($words);
        $words = preg_replace("/[\?\!\.\,\+\=\(\)\-\_\*\/\%\$\#\&\@\"\'\:\;]+/", " ", $words);
        $words_arr = explode(" ", $words);
        foreach ($words_arr as $value)
        {
                $sql .= "iblock_elements.name LIKE \"%".mysql_escape_string($value)."%\" AND ";
        }
        $sql = substr($sql, 0, strlen($sql) - 4);
        return $sql;
}

function ReverseOrder(&$param, &$pic)
{
	switch ($param)
	{
		case 'asc':
		$param = 'desc';
		$pic = '<img src="/images/up.gif" class="sort_pic" align="absmiddle">';
		break;
		case 'desc':
		$param = 'asc';
		$pic = '<img src="/images/down.gif" class="sort_pic" align="absmiddle">';
		break;
	}
}

function GetChildGroupsArray($iblock_id)
{
	$iblock = new iblock();

	$items = $iblock->GetList(array('parent_id' => intval($iblock_id)));
	while ($data = $items->GetData())
	{
		$id_data = array($data['id']);
		$iblock->RecursiveGetChildIds($data['id'], $id_data);
		$groups_id_data[] = $id_data;
	}
	return $groups_id_data;
}
?>
