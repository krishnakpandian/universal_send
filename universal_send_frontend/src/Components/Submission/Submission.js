import React, {Component} from 'react';
import './Submission.scss';

class Submission extends Component {
    constructor(props){
        super(props);
        this.state = {
            twitter: false,
            reddit: false,
            facebook: false,
            message: "",
            image: null,
            file: null
        }
    }
    onSubmit() {
        const url = 'none';
        const opts ='set later';
        fetch(url, {method: 'post', body: JSON.stringify(opts)}).then((response) => {
            return response.json();
          })
    }
    validate() {

    }
    handleChange(e) {
        e.preventdefault()
        this.setState({[e.target.name]: e.target.value});
    }

    handleImage = e => {
        if (e.target.files[0]){
          const image = e.target.files[0];
          this.setState( () => ({ image })  );
          this.setState({file: URL.createObjectURL(image)});
        }
      };
    

    render() {
        const data = this.state;
        return(
            <React.Fragment>
                <div class="submission">
                <input
                    type="text"
                    name="username"
                    value={data.username}
                    onChange={data.handleChange}
                    placeholder="Message"
                    maxLength="100"
                />
                <input type="file" onChange={this.handleImage} accept ="image/*"/>
                <button onClick= {this.onSubmit}>Submit</button>
                </div>
            </React.Fragment>
        )
    }
}

export default Submission;