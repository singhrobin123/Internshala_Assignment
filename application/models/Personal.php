<?php


class Personal extends CI_Model{
  public $input;
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	
	}
    public function getAllCourse(){


		$sql = "Select courses.id AS course_id,courses.name,courses.url,batches.id AS batch_id,batches.date FROM courses INNER JOIN batches ON courses.id = batches.course_id  AND courses.signup_active = '1'";
		$query = $this->db->query($sql);
	
                 return $query->result();
 

	}
	public function UserModel($s_id){
		
		$s_id = (int)$s_id;
		$sql = "select *from users where student_id = ?";
		$query = $this->db->query($sql,array($s_id));
		$user = $query->result();
		$sql = "select courses.name, batches.course_id,batches.date,users.is_paid from users INNER JOIN batches ON users.batch_id = batches.id AND users.student_id = ? INNER JOIN courses ON courses.id = batches.course_id";
		$query = $this->db->query($sql,array($s_id));
		$data = $query->result();
		$sql = "Select courses.id AS course_id,courses.name,courses.url,batches.id AS batch_id,batches.date FROM courses INNER JOIN batches ON courses.id = batches.course_id  AND courses.signup_active = '1'";
		$query = $this->db->query($sql);
        $courses =  $query->result();
		$data = [
			'flag' => true,
			'User' => $data,
			'courses' => $courses
		];
		return $data;

	}
	
	public function registerModel($email, $password,$first_name,$last_name,$batch_id, $objective_of_learning,$course_id)
    { 
		
		$batch_id = (int)$batch_id;
		$course_id = (int)$course_id;
		$sql = "select id from students where email = ?";
		$query = $this->db->query($sql,array($email));
		$dc = $query->result();
		
		
		if($dc){
			
			$data = [
				'flag' => false,
				'users' => [],
				'Courses' => false,
				's_id'   => null,
				 'message' => 'Email already exist',
				 'password' => false,
				 'email'  => false
			];
			return $data;

		}
		else{
			$sql = "INSERT INTO students (email,first_name,last_name,password) VALUES (?,?,?,?)";
			$query = $this->db->query($sql,array($email,$first_name,$last_name,$password));
		
			if($query){
				$sql = "SELECT id from students where email = ?";
				$query2 = $this->db->query($sql,array($email));
				$ans = $query2->result();
				$sql = "INSERT INTO users (student_id ,batch_id,objective_of_learning) VALUES (?,?,?)";
				$query = $this->db->query($sql,array($ans[0]->id,$batch_id,$objective_of_learning));
				
				$s_id = $ans[0]->id;
				 $sql = "select * FROM users where student_id = ?";
				 $query = $this->db->query($sql,array($s_id));
				 $users = $query->result();
				 $sql = "select courses.id AS course_id,courses.name,courses.url,batches.id AS batch_id,batches.date FROM courses INNER JOIN batches ON courses.id = batches.course_id  AND courses.signup_active = '1'";
				 $query = $this->db->query($sql);
				 $Courses = $query->result();
		     	$data = [
                'flag' => true,
				'users' => $users,
				'Courses ' => $Courses,
				's_id'   => $s_id,
				'message' => 'successfully registered'
			   ];
		
		     	return $data;
			}
		}
		
    }
	
	public function courseModel($s_id,$batch_id, $objective_of_learning,$course_id)
    {   
		
		$s_id = (int)$s_id;
		$batch_id = (int)$batch_id;
		$course_id = (int)$course_id;
		$sql = "select batches.course_id from batches INNER JOIN users ON batches.id = users.batch_id AND student_id = ?";
		$query = $this->db->query($sql,array($s_id));
       foreach ($query->result_array() as $row)
       {
		$x = (int)$row['course_id'];
		if($x == $course_id){
				$f = 1; 
			$data = [
							 'flag' => false,
							 'Course' => false,
							 's_id'   => $s_id,
							 'message' => 'Course already registered',

						];

						return $data;
		}
        
      }       
	  $sql = "select id from students where id = ?";
	  $query = $this->db->query($sql,array($s_id));
	  $new_s_id = $query->result();
	  $new_s_id =   $new_s_id[0]->id;
	  $sql = "INSERT INTO users (student_id ,batch_id,objective_of_learning) VALUES (?,?,?)";
	  $query = $this->db->query($sql,array($new_s_id,$batch_id,$objective_of_learning));
	
			   if($query){
				$data = [
					'flag' => true,
					'Course' => true,
					's_id'   => $s_id,
					'message' => 'successfully registered',

			   ];
			   return $data;
			  
			}
			else{
				$data = [
					'flag' => false,
					'Course' => false,
					's_id'   => $s_id,
					'message' => 'something went wrong',

			   ];
			   return $data;
			}


			
		 }
	public function loginModel($email, $password)
    { 

		$sql = "select *from students where email = ?";
		$query = $this->db->query($sql,array($email));
		if($query->result()){
			$sql = "select * from students where email = ?";
			$query = $this->db->query($sql,array($email));
			$pass = $query->result();
			if($pass[0]->password == $password){
				$s_id = $pass[0]->id;
				 $sql = "select * FROM users where student_id = ?";
				 $query = $this->db->query($sql,array($s_id));
				 $users = $query->result();
				 $sql = "select courses.id AS course_id,courses.name,courses.url,batches.id AS batch_id,batches.date FROM courses INNER JOIN batches ON courses.id = batches.course_id  AND courses.signup_active = '1'";
				 $query = $this->db->query($sql);
				 $Courses = $query->result();
			$data = [
                'flag' => true,
				'users' => $users,
				'Courses' => $Courses,
				's_id'   => $s_id
			];
			return $data;
		

			}
			else{
				$data = [
					'flag' => false,
					'users' => null,
					'Courses' => null,
					's_id'   => null,
					'message' => 'password wrong',
					 'password' => false,
					 'email'  => true
				];
				return $data;
			}
		
		}
		else{

			$data = [
				'flag' => false,
				'users' => null,
				'Courses' => null,
				's_id'   => null,
				'message' => 'Email not exist',
				 'password' => false,
				 'email'  => false
			];
			return $data;
		}
		
			$data = [
				'message' => "User Successfully Login",
				'user' =>  "1234"
			];
			return $data;
		 }
      
}
?>
