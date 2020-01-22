import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    signOut(event) {
        event.preventDefault();
        const cookies = new Cookies();
        cookies.remove('myCat', { path: '/' });
        this.props.history.push("/");
    }

    render() {
        const cookies = new Cookies();
        const styleTdWhiteRight = {
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '5px 0 0 5px',
            display: 'flex',
            alignItems: 'center'
        };
        const styleTdWhiteLeft = {
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '0 5px 5px 0'
        };
        const borderWhite = {
            borderRadius: 5,
            border: '1px solid #FFFFFF',
            padding: 10,
            width: '94%',
            margin: '0 3%',
            display: 'block',
            fontStyle: 'italic',
            fontWeight: 'normal'
        };
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/sign-in"} style={{ fontSize: '1.5em', color: '#FC9B4A' }}>Free<strong style={{ color: '#FF0387' }}>Time</strong></Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item" style={{ display: 'flex', alignItems: 'center' }}>
                                    <span>{cookies.get('myCat')}</span>
                                    <img style={{ width: 40, height: 40, borderRadius: '50%', margin: '0 10px 0 7px' }} alt="active user avatar" src="data:image/jpeg;base64,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" />
                                </li>
                                <li className="nav-item" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Link className="nav-link" to={"/"} onClick={this.signOut} style={{ width: 30, height: 30, padding: '1px 3px 5px 6px', backgroundImage: 'linear-gradient(45deg, #FF0488, #FD9D4A)', borderRadius: '50%' }}><svg style={{ width: 15, height: 15 }} xmlns="http://www.w3.org/2000/svg" height="512px" viewBox="0 0 512.00533 512" width="512px" class=""><g><path d="m320 277.335938c-11.796875 0-21.332031 9.558593-21.332031 21.332031v85.335937c0 11.753906-9.558594 21.332032-21.335938 21.332032h-64v-320c0-18.21875-11.605469-34.496094-29.054687-40.554688l-6.316406-2.113281h99.371093c11.777344 0 21.335938 9.578125 21.335938 21.335937v64c0 11.773438 9.535156 21.332032 21.332031 21.332032s21.332031-9.558594 21.332031-21.332032v-64c0-35.285156-28.714843-63.99999975-64-63.99999975h-229.332031c-.8125 0-1.492188.36328175-2.28125.46874975-1.027344-.085937-2.007812-.46874975-3.050781-.46874975-23.53125 0-42.667969 19.13281275-42.667969 42.66406275v384c0 18.21875 11.605469 34.496093 29.054688 40.554687l128.386718 42.796875c4.351563 1.34375 8.679688 1.984375 13.226563 1.984375 23.53125 0 42.664062-19.136718 42.664062-42.667968v-21.332032h64c35.285157 0 64-28.714844 64-64v-85.335937c0-11.773438-9.535156-21.332031-21.332031-21.332031zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF" /><path d="m505.75 198.253906-85.335938-85.332031c-6.097656-6.101563-15.273437-7.9375-23.25-4.632813-7.957031 3.308594-13.164062 11.09375-13.164062 19.714844v64h-85.332031c-11.777344 0-21.335938 9.554688-21.335938 21.332032 0 11.777343 9.558594 21.332031 21.335938 21.332031h85.332031v64c0 8.621093 5.207031 16.40625 13.164062 19.714843 7.976563 3.304688 17.152344 1.46875 23.25-4.628906l85.335938-85.335937c8.339844-8.339844 8.339844-21.824219 0-30.164063zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF" /></g> </svg></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="App">
                    <div style={{ paddingTop: 75, width: '100%', height: '100vh', background: '#F5F4F3' }}>
                        {/* <h3>Build Sign Up & Login UI Template in React</h3> */}
                        <Table style={{ margin: '40px auto', maxWidth: 1080 }}>
                            <Thead>
                                <Tr>
                                    <Th><span style={{ marginBottom: 25, display: 'block' }}>Team Member</span></Th>
                                    <Th><span style={{ marginBottom: 25, display: 'block' }}>Status</span></Th>
                                    <Th><span style={{ marginBottom: 25, display: 'block' }}>Note</span></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td style={styleTdWhiteRight}>
                                        <img style={{ width: 50, height: 50, borderRadius: '50%', margin: '0 10px 0 7px' }} alt="active user avatar" src="data:image/jpeg;base64,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" />
                                        <div>
                                            <span style={{ display: 'block', fontWeight: 'bold', textAlign: 'left' }}>Abu Bakar</span>
                                            <span style={{ fontWeight: 'normal', textAlign: 'left', fontSize: '0.95em' }}>Developer Team Manager</span>
                                        </div></Td>
                                    <Td style={styleTdWhiteLeft}>
                                        <form>
                                            <div className="radio">
                                                <label>
                                                    <input type="radio" value="option1" checked={true} />
                                                    Option 1
                                                </label>
                                            </div>
                                            <div className="radio">
                                                <label>
                                                    <input type="radio" value="option2" />
                                                    Option 2
                                                </label>
                                            </div>
                                            <div className="radio">
                                                <label>
                                                    <input type="radio" value="option3" />
                                                    Option 3
                                                </label>
                                            </div>
                                        </form>
                                    </Td>
                                    <Td><span style={borderWhite}>Sedang sibuk mengatur instance karmagroup dev. di GCP</span></Td>
                                </Tr>
                                <Tr>
                                    <Td>Abu Bakar</Td>
                                    <Td>Bussy</Td>
                                    <Td>Oprek GCP</Td>
                                </Tr>
                                <Tr>
                                    <Td>Abu Bakar</Td>
                                    <Td>Bussy</Td>
                                    <Td>Oprek GCP</Td>
                                </Tr>
                                <Tr>
                                    <Td>Abu Bakar</Td>
                                    <Td>Bussy</Td>
                                    <Td>Oprek GCP</Td>
                                </Tr>
                                <Tr>
                                    <Td>Abu Bakar</Td>
                                    <Td>Bussy</Td>
                                    <Td>Oprek GCP</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}
