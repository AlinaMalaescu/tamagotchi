import { useForm } from 'react-hook-form';


export default function LoginForm({handleSignUp}) {


  const {
    handleSubmit: handleSubmit1,
    register: register1
  } = useForm();

  const {
    handleSubmit: handleSubmit2,
    register: register2
  } = useForm();

    return (
     <div className="loginForm">
      <div className="containerLogin">
      <input id="register_toggle" type="checkbox"/>
      <div className="slider">
        <form className="form" onSubmit={handleSubmit1(data => handleSignUp(data))} >
          <span className="title">Login</span>
          <div className="form_control">
            <input required="" { ...register1('name')} className="input" type="text" id="loginName"/>
            <label className="label">Username</label>
          </div>
          <div className="form_control">
            <input required="" className="input"  {...register1('password')} type="password" id="loginPassword"/>
            <label className="label">Password</label>
          </div>
          <button type="submit">Login</button>
    
          <span className="bottom_text">Don't have an account? <label className="swtich" htmlFor="register_toggle">Sign Up</label> </span>
        </form>

        <form className="form" onSubmit={handleSubmit2(data => handleSignUp(data))}>
          <span className="title">Sign Up</span>
          <div className="form_control">
            <input required="" className="input"  type="text" name="user" id="signUpName" { ...register2('name')} />
            <label className="label">Username</label>
          </div>
        
          <div className="form_control">
            <input required="" className="input" type="password" name="user" id="signUpPassword" { ...register2('password')} />
            <label className="label">Password</label>
          </div>
          <button type="submit">Sign Up</button>
    
          <span className="bottom_text">Already have an account? <label className="swtich" htmlFor="register_toggle">Sign In</label> </span>
        </form> 
        </div>
      </div>
    </div>
    )
  }