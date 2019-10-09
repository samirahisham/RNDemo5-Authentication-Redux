import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text
} from "native-base";
import jwt_decode from "jwt-decode";

import { connect } from "react-redux";

import { login, signup } from "../redux/actions/authActions";

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };
  handleChange = keyValue => {
    this.setState(keyValue);
  };

  handleSubmit = () => {
    this.props.login(this.state);
  };
  handleSubmit2 = () => {
    this.props.signup(this.state);
  };

  render() {
    const { username, password } = this.state;
    console.log(this.state);
    return (
      <>
        <Container>
          <Header />
          <Content>
            <Form>
              <Item>
                <Input
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChangeText={username => this.handleChange({ username })}
                />
              </Item>
              <Item last>
                <Input
                  value={password}
                  placeholder="Password"
                  secureTextEntry
                  name="password"
                  onChangeText={password => this.handleChange({ password })}
                />
              </Item>
              <Button onPress={this.handleSubmit}>
                <Text>Login</Text>
              </Button>
            </Form>
          </Content>
        </Container>
        {/* 
        <Container>
          <Header />
          <Content>
            <Form>
              <Item>
                <Input
                  name="username"
                  value={username}
                  placeholder="Username"
                />
              </Item>
              <Item last>
                <Input
                  value={password}
                  placeholder="Password"
                  secureTextEntry
                  name="password"
                />
              </Item>
              <Button onPress={this.handleSubmit2}>
                <Text>signup</Text>
              </Button>
            </Form>
          </Content>
        </Container> */}
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.rootAuth.user
});
const mapDispatchToProps = dispatch => {
  return {
    login: userData => dispatch(login(userData)),
    logout: () => dispatch(logout()),
    signup: userData => dispatch(signup(userData)),
    checkForToken: () => dispatch(checkForExpiredToken())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
