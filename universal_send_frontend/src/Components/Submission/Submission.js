import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './Submission.scss';

class Submission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            twitter: false,
            reddit: false,
            facebook: false,
            message: "",
            image: null,
            file: null,
        }
    }
    onSubmit() {
        if (this.state.twitter && this.state.facebook && this.state.reddit) {
            return ;
        }
        if (this.state.message.length > 1000 || this.state.message <= 0){
            return ;
        }
        prompt = {
            platforms: {
                twitter: this.state.twitter,
                facebook: this.state.facebook,
                reddit: this.state.reddit
            },
            fields: {
                subreddit: this.state.subreddit,
                title: this.state.title
            },
            message: this.state.message,
            imagePathway: this.state.image
        }
        const url = 'localhost:3000/all';
        fetch(url, { method: 'post', body: prompt  }).then((response) => {
            return response.json();
        })
    }
    handleChange(e) {
        //e.preventdefault()
        this.setState({ [e.target.name]: e.target.value });
    }
    handleChangeCheckBox = async (event) => {
        await this.setState({ [event.target.name]: event.target.checked });
    };
    handleImage = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
            this.setState({ file: URL.createObjectURL(image) });
        }
    };


    render() {
        return (
            <React.Fragment>
                <div class="submission">
                    <input
                        type="text"
                        name="message"
                        value={this.state.message}
                        onChange={this.handleChange.bind(this)}
                        placeholder="message"
                        maxLength="1000"
                    />
                <div class="counter"> 
                    character count: {this.state.message.length}
                    {this.state.message.length > 280 && this.state.twitter ? "This will be split into multiple Tweets": ""}
                </div>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.twitter}
                                    onChange={this.handleChangeCheckBox}
                                    name="twitter"
                                    value="twitter"
                                />
                            }
                            label="Twitter"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.facebook}
                                    onChange={this.handleChangeCheckBox}
                                    name="facebook"
                                    value="facebook"
                                />
                            }
                            label="Facebook"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.reddit}
                                    onChange={this.handleChangeCheckBox}
                                    name="reddit"
                                    value="reddit"
                                />
                            }
                            label="Reddit"
                        />
                    </FormGroup>
                    <input type="file" onChange={this.handleImage} accept="image/*" />
                    <input type="submit" onClick={this.onSubmit}/>
                    <div class="errors">
                            {!this.state.facebook && !this.state.twitter && !this.state.reddit && "This must be a message"}
                            {this.state.message.length < 1 && "Message is too Short"}
                            {this.state.message.length > 1000 && "Message is too Long"}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Submission;