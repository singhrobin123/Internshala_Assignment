<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: content-type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE'); //method allow


class Register extends CI_Controller
{
    
    public $DatabaseObj;
    
    public function __construct()
    {
        parent::__construct();
        
        // $this->itemCRUD = 5;
        $this->load->library('form_validation');
        $this->load->library('session');
        $this->load->model('Personal');
        
        
        $this->DatabaseObj = new Personal;
    }
    public function index()
    {
        
       
        $json = file_get_contents('php://input');
        $obj  = json_decode($json);
       
        $flag = $obj->flag;
        
        if ($flag == 0) {
            
            $s_id                  = $obj->s_id;
            $batch_id              = $obj->select_batch;
            $course_id             = $obj->select_courses;
            $objective_of_learning = $obj->objective_learning;
            $data['data']          = $this->DatabaseObj->courseModel($s_id, $batch_id, $objective_of_learning, $course_id);
            $response['success']   = true;
            $response['data']      = $data;
            $this->output->set_status_header(200)->set_content_type('application/json')->set_output(json_encode($response));
        }
         else {
            
            $email                 = $obj->email;
            $password              = $obj->password;
            $first_name            = $obj->first_name;
            $last_name             = $obj->last_name;
            $batch_id              = $obj->select_batch;
            $course_id             = $obj->select_courses;
            $objective_of_learning = $obj->objective_learning;
            $data['data']          = $this->DatabaseObj->registerModel($email, $password, $first_name, $last_name, $batch_id, $objective_of_learning, $course_id);
            $response['success']   = true;
            $response['data']      = $data;
            $this->output->set_status_header(200)->set_content_type('application/json')->set_output(json_encode($response));
        }
        
        
    }
    
    
}
