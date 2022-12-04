import React, { Component } from 'react';
import turbosanta from '../img/turbosanta.svg'
import { submitSanta } from '../API/turboAPI'

class SecretSanta extends Component {
    state = {  } 

    submit = async (event) => {
        event.preventDefault()

        let formResult = {
            name: '',
            email: '',
            message: '',
            shirtsize: '',
            snack: '',
            color: ''
        }

        let filled = true

        const form = document.forms["ssForm"].elements

        for (const key in form) {
            if (form.hasOwnProperty(key)) {
                const element = form[key];
                if (element.value===''&&element.name!=='submit'){
                    filled = false
                    element.classList.add("notfilled")
                }
                else{
                    element.classList.remove("notfilled")
                }
            }
        }

        if (filled){
            formResult['name'] = document.forms["ssForm"]["name"].value;
            formResult['email'] = document.forms["ssForm"]["email"].value;
            formResult['message'] = document.forms["ssForm"]["message"].value;
            formResult['shirtsize'] = document.forms["ssForm"]["shirtsize"].value;
            formResult['snack'] = document.forms["ssForm"]["snack"].value;
            formResult['color'] = document.forms["ssForm"]["color"].value;
            
            const response = await submitSanta(formResult)
            console.log(response);

            this.setState({submitted: formResult})
        }
        else{
            document.getElementsByClassName('unfilledWarning')[0].style.display = "block";
        }
    }

    render() { 
        return (
            
            <div className="santaPage">
                <div className="pageContent">
                    
                
            {this.state.submitted ? <div className="submitted">Submitted!</div> :
            <div className='santaForm'>
                <div className="santalogo">
                    <img src={turbosanta} alt="turbo logo with santa hat" />
                </div>
                <div className="heading">Secret Santa Sign-up</div>
                <form className="ssForm" name="ssForm">
                    <label>
                        Name (first and last):
                    </label>
                    <input type="text" name="name"/>
                    <label>
                        Email:
                    </label>
                    <input type="text" name="email"/>
                    <label>
                        Message / Gift Preferences
                    </label>
                    <textarea rows='4' name="message" maxLength="500"></textarea>
                    <label>
                        Shirt Size
                    </label>
                    
                    <select name="shirtsize" defaultValue="">
                        <option value="" disabled hidden>-- Please Choose a Size --</option>
                        <option value="XS">XS - Extra Small</option>
                        <option value="S">S - Small</option>
                        <option value="M">M - Medium</option>
                        <option value="L">L - Large</option>
                        <option value="XL">XL - Extra Large</option>
                        <option value="XXL">XXL - Extra Extra Large</option>
                    </select>
                    
                    <label>
                        Favorite Snack
                    </label>
                    <input type="text" name="snack" />
                    <label>
                        Favorite Color
                    </label>
                    <input type="text" name="color" />

                <div className="unfilledWarning">
                Make sure you've filled out all the fields!
                </div>

                <button className="submit" name="submit" onClick={this.submit}>
                    Submit
                </button>

                </form>
            </div>}

            </div>
            </div>
        );
    }
}
 
export default SecretSanta;