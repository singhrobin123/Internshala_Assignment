<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: content-type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE'); //method allowed


class Auth extends CI_Controller
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
        $json = file_get_contents('php://input');
        $obj  = json_decode($json);
        
        $email        = $obj->email;
        $password     = $obj->password;
        $data['data'] = $this->DatabaseObj->loginModel($email, $password);
        
        $response['success'] = true;
        $response['data']    = $data;
        $this->output->set_status_header(200)->set_content_type('application/json')->set_output(json_encode($response));
    }
    
}
