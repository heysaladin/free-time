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
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/sign-in"}>Free<strong>Time</strong></Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <span>{cookies.get('myCat')}</span>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/"} onClick={this.signOut}>Sign out</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="App">
                    <div style={{ paddingTop: 75, width: '100%', height: '100vh', background: 'white' }}>
                        {/* <h3>Build Sign Up & Login UI Template in React</h3> */}
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Team Member</Th>
                                    <Th>Status</Th>
                                    <Th>Note</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
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
