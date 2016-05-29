<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

//echo "<pre>";
//print_r($_REQUEST);
//print_r($_SERVER);
//echo "</pre>";

class Book extends CI_Controller {

  	var $breadcrumbs = array();
  	var $breadcrumbs_str = "";
	var $breadcrumbs_delimeter = '»';

	public function __construct()
	{
//echo "Book, public function __construct()";
//echo "<br>";
	        parent::__construct();
		$this->form_breadcrumbs();
	}

	public function index()
	{
//echo "Book, public function index()";
//echo "<br>";
//$this->breadcrumb->add('Home', $this->config->item('base_url'));
//echo "<pre>";
//print_r($this->breadcrumb);
//echo "</pre>";

		$this->load->database();
		$this->load->model('Book_model');
		$book=array();
		$field_book_title="Очерки по истории и технике гравюры";
//------------------------ получить страницы 1-го уровня (тетради)
		$book['notebooks']= $this->Book_model->get_book_content($field_book_title);
//echo "book = <pre>";
//print_r($book);
//echo "</pre>";

		$data['book']=$book;
		$data['template']='view-content';
		$data['title']=$field_book_title;
		//$data['breadcrumbs']=$this->breadcrumbs;
		$data['breadcrumbs']=$this->breadcrumbs_str;

		$this->load->view('layout',$data);
	}//--------------------------- end func

	public function get_page()
	{
//echo "public function get_page()";
//echo "<br>";
		$this->load->database();
		$this->load->model('Book_model');

		$page=array();
		if (!empty($_REQUEST['mlid']))
		{
			$page=$this->Book_model->get_page($_REQUEST['mlid']);
			$page['child']=$this->Book_model->get_child_pages($page[0]->mlid);

			$page['page_images']=$this->Book_model->get_page_images($page[0]->nid);
//echo "page = <pre>";
//print_r($page);
//echo "</pre>";
			$data['page']=$page;
			$data['template']='view-page';
			$data['title']=$page[0]->title;

//-------- строка навигации и ссылки на соседнии страницы в нижней части
			$data['breadcrumbs']=$this->breadcrumbs_str;

			if ($page[0]->depth > 5)
			{
				$items = $this->Book_model->get_page_list($_REQUEST['mlid'],$page[0]->plid);
//echo "items - <pre>";
//print_r($items);
//echo "</pre>";
				for ($n1=0; $n1<count($items); $n1++)
				{
					if ($items[$n1]->mlid == $_REQUEST['mlid'])
					{
						if ($n1>0)
						{
				$data['page_links']['page_previous_mlid']=$items[$n1-1]->mlid;
				$data['page_links']['page_previous_link_title']=$items[$n1-1]->link_title;
						}

						$data['page_links']['content_plid']=$items[$n1]->plid;
						$data['page_links']['content_link_title']=$items[$n1]->link_title;

						if ($n1<count($items)-1)
						{
				$data['page_links']['page_next_mlid']=$items[$n1+1]->mlid;
				$data['page_links']['page_next_link_title']=$items[$n1+1]->link_title;
						}
					}
				}
			}
			else
			{
				$data['page_links']="";
			}
//---------------------------------------------------------------------

			$this->load->view('layout',$data);
		}
	}//--------------------------- end func


	public function form_breadcrumbs()
	{
//echo $this->config->item('base_url');
//echo "<br>";
//echo "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
//echo "<br>";
//echo "<pre>";
//print_r($this->breadcrumbs);
//print_r($this->breadcrumb);
//print_r($this->config);
//echo "</pre>";
		//$this->load->library('breadcrumb');

		$this->load->helper('url');
		if ($this->config->item('base_url') == "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'])
		{
			$this->breadcrumbs_str .= 'Главная';
		}
		else
		{
			$this->breadcrumbs_str = anchor($this->config->item('base_url'), 
								'Главная', 
								array('title' => 'Главная'));
		}

		if (!empty($_REQUEST['mlid']))
		{
			$this->load->database();
			$this->load->model('Book_model');
			$items = $this->Book_model->get_breadcrumbs($_REQUEST['mlid']);
//echo "items - <pre>";
//print_r($items);
//echo "</pre>";
			$n2=count($items)-1;
			for ($n1=0; $n1<count($items); $n1++)
			{
				$this->breadcrumbs_str .= " ".$this->breadcrumbs_delimeter." ";

				$url = $this->config->item('base_url')
."index.php/book/get_page/?mlid=".$items[$n2]->mlid;
//echo "url = ".$url;
//echo "<br>";
				if ($url=="http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'])
				{
					$this->breadcrumbs_str .= $items[$n2]->link_title;
				}
				else
				{
					$this->breadcrumbs_str .= anchor($url, $items[$n2]->link_title);
				}

				$n2--;
			}
			
		}
	}//--------------------------- end func

}//------------------------------------ end class

