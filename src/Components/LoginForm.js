import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


export default class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                user: '',
                password: ''
            },
            valid: false
        }

        this.formEl = React.createRef();
    }

    onChange = e => {
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            },
            valid: this.formEl.current.checkValidity()
        })
    }

    onSubmitHandler = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.data);
    }

    render() {
        return (
            <Form onSubmit={this.onSubmitHandler} innerRef={this.formEl}>
                <FormGroup>
                    <Label for="user">User</Label>
                    <Input type="text" name="user" placeholder="User or email" onChange={this.onChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" placeholder="Password" onChange={this.onChange} required />
                </FormGroup>

                <Button disabled={!this.state.valid} type="submit">Submit</Button>
            </Form>
        );
    }
}
