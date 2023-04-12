import React, { useState } from 'react';
import { useNavigate, Form } from 'react-router-dom';
import { userContext } from '../context';
import '../scss/SignupPage.scss';


const SignUpPage = () => {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate()

	////////////////////////////////////////////
	async function handleSubmit(e) {
	
	// make the fetch to the backend to authenticate the credentials
	try {
        e.preventDefault();

		const res = await fetch('/api/users/signup', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username: username, password: password })
		});
        // **checking to see if user is already in database
		console.log(res)
		if (res.status) { 
			console.log('Signup successful!');
			const id = 1234
			// return navigate(`/LoginPage`);  //where do you guys want to redirect this to
			return navigate(`/user_home`);
		} else {
			alert('Username already taken or server error');
		}
		} catch (error) {
		console.error(error);
		}
	}
	/////////////////////////////////////////////////


	return (
		<main className='signup-page'>
			<div className='signup-div'>
			<Form className='form' onSubmit ={handleSubmit}>
				<div className='username-box'>
					<span>What will your username be?</span>
					<input 
						type='text'
						placeholder='username'
						value = {username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className='password-box'>
					<span>What will your password be?</span>
					<input 
						type='text'
						placeholder="password" 
						value = {password}     
						onChange={(e) => setPassword(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') handleSubmit();
						}}
					/>
				</div>
				<div id='signup-btn' className='button-div'>
					<button type='submit'>Create Account</button>
				</div>
			</Form>
			</div>
		</main>
	);
  
  
  // return (
  //   <h1>Signup Page</h1>
  // )
};

export default SignUpPage;