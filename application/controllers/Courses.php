<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');

class Courses extends CI_Controller
{
    
    public $DatabaseObj;
    
    public function __construct()
    {
        parent::__construct();
        
        $this->load->library('form_validation');
        $this->load->library('session');
        $this->load->model('Personal');
        
        
        $this->DatabaseObj = new Personal;
    }
    public function index()
    {
        
        $data['data']        = $this->DatabaseObj->getAllCourse();
        $response['success'] = true;
        $response['data']    = $data;
        $this->output->set_status_header(200)->set_content_type('application/json')->set_output(json_encode($response));
        
    }
    
    
}
