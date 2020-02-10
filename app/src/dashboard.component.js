import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import firebase from 'firebase'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
        // this.state = {
        //     selectedOption: "option1"
        // }
        this.state = {
            selectedOption: "option1",
            selectedOptionFinal: "option1",
            isActive: true,
            dataUsers: []
        }
        const config = {
            apiKey: "AIzaSyBo55xw5ulgxA9RLOnxr45prd7KoIjEh0o",
            authDomain: "saladin-projects.firebaseapp.com",
            databaseURL: "https://saladin-projects.firebaseio.com",
            projectId: "saladin-projects",
            storageBucket: "saladin-projects.appspot.com",
            messagingSenderId: "sender-id",
            appID: "saladin-projects"
        };
        firebase.initializeApp(config);

        this.getData();

    }

    getData() {

        // let dataUsers = [];

        // const tblUsers = document.getElementById('tbl_users_list');
        const databaseRef = firebase.database().ref('users/');
        let rowIndex = 1;

        // console.log(dataUsers)

        // databaseRef.once('value', function (snapshot) {
        //     snapshot.forEach(function (childSnapshot) {
        //         var childKey = childSnapshot.key;
        //         var childData = childSnapshot.val();

        //         //    var row = tblUsers.insertRow(rowIndex);
        //         //    var cellId = row.insertCell(0);
        //         //    var cellName = row.insertCell(1);
        //         //    cellId.appendChild(document.createTextNode(childKey));
        //         //    cellName.appendChild(document.createTextNode(childData.user_name));

        //         // console.log(document.createTextNode(JSON.stringify(childData)));

        //         let dataUser = { "user_id": document.createTextNode(childData.user_id), "user_name": document.createTextNode(childData.user_name) }

        //         let dataAdd = this.state.dataUsers.concat(dataUser)

        //         this.setState({ dataUsers: dataAdd });

        //         console.log(this.state.dataUsers)

        //         rowIndex = rowIndex + 1;
        //     });
        // });

    }



    signOut(event) {
        event.preventDefault();
        const cookies = new Cookies();
        cookies.remove('myCat', { path: '/' });
        this.props.history.push("/");
    }

    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        console.log("You have submitted:", this.state.selectedOption);

        var data = {
            user_id: '-LzoaqB-bYrw9K-x8TTl',
            user_name: this.state.selectedOption
        }

        var updates = {};
        updates['/users/' + '-LzoaqB-bYrw9K-x8TTl'] = data;
        firebase.database().ref().update(updates);

        this.setState({
            isActive: true,
            selectedOptionFinal: this.state.selectedOption
        });

        // this.getData();


    };

    render() {
        const cookies = new Cookies();
        const styleTdWhiteRight = {
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '5px 0 0 5px',
            display: 'flex',
            alignItems: 'center',
            minWidth: 300
        };
        const styleTdWhiteLeft = {
            backgroundColor: 'white',
            // padding: '10px',
            borderRadius: '0 5px 5px 0',
            minWidth: 380
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
        const formCheck = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 8,
            background: '#eeeeee',
            borderRadius: 6,
            marginLeft: 3,
            marginRight: 3,
            paddingRight: 0,
            paddingLeft: 36
        }
        const formCheckBussy = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 8,
            background: 'red',
            borderRadius: 6,
            marginLeft: 3,
            marginRight: 3,
            paddingRight: 0,
            paddingLeft: 36
        }
        const formCheckFree = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 8,
            background: 'blue',
            borderRadius: 6,
            marginLeft: 3,
            marginRight: 3,
            paddingRight: 0,
            paddingLeft: 36
        }
        const formCheckLearn = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 8,
            background: 'green',
            borderRadius: 6,
            marginLeft: 3,
            marginRight: 3,
            paddingRight: 0,
            paddingLeft: 36
        }
        const whiteText = {
            color: 'white',
            height: 48,
            display: 'flex',
            alignItems: 'center',
            paddingRight: 23
        }
        const blackText = {
            color: 'black',
            height: 48,
            display: 'flex',
            alignItems: 'center',
            paddingRight: 23
        }
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
                                    <Link className="nav-link" to={"/"} onClick={this.signOut} style={{ width: 30, height: 30, padding: '1px 3px 5px 6px', backgroundImage: 'linear-gradient(45deg, #FF0488, #FD9D4A)', borderRadius: '50%' }}><svg style={{ width: 15, height: 15 }} xmlns="http://www.w3.org/2000/svg" height="512px" viewBox="0 0 512.00533 512" width="512px" className=""><g><path d="m320 277.335938c-11.796875 0-21.332031 9.558593-21.332031 21.332031v85.335937c0 11.753906-9.558594 21.332032-21.335938 21.332032h-64v-320c0-18.21875-11.605469-34.496094-29.054687-40.554688l-6.316406-2.113281h99.371093c11.777344 0 21.335938 9.578125 21.335938 21.335937v64c0 11.773438 9.535156 21.332032 21.332031 21.332032s21.332031-9.558594 21.332031-21.332032v-64c0-35.285156-28.714843-63.99999975-64-63.99999975h-229.332031c-.8125 0-1.492188.36328175-2.28125.46874975-1.027344-.085937-2.007812-.46874975-3.050781-.46874975-23.53125 0-42.667969 19.13281275-42.667969 42.66406275v384c0 18.21875 11.605469 34.496093 29.054688 40.554687l128.386718 42.796875c4.351563 1.34375 8.679688 1.984375 13.226563 1.984375 23.53125 0 42.664062-19.136718 42.664062-42.667968v-21.332032h64c35.285157 0 64-28.714844 64-64v-85.335937c0-11.773438-9.535156-21.332031-21.332031-21.332031zm0 0" data-original="#000000" className="active-path" data-old_color="#000000" fill="#FFFFFF" /><path d="m505.75 198.253906-85.335938-85.332031c-6.097656-6.101563-15.273437-7.9375-23.25-4.632813-7.957031 3.308594-13.164062 11.09375-13.164062 19.714844v64h-85.332031c-11.777344 0-21.335938 9.554688-21.335938 21.332032 0 11.777343 9.558594 21.332031 21.335938 21.332031h85.332031v64c0 8.621093 5.207031 16.40625 13.164062 19.714843 7.976563 3.304688 17.152344 1.46875 23.25-4.628906l85.335938-85.335937c8.339844-8.339844 8.339844-21.824219 0-30.164063zm0 0" data-original="#000000" className="active-path" data-old_color="#000000" fill="#FFFFFF" /></g> </svg></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="App">
                    <div style={{ paddingTop: 75, width: '100%', height: '100vh', background: '#F5F4F3' }}>
                        {/* <h3>Build Sign Up & Login UI Template in React</h3> */}
                        <Table style={{ margin: '40px auto', maxWidth: 1080 }} id="tbl_users_list">
                            <Thead>
                                <Tr>
                                    <Th><span style={{ marginBottom: 25, display: 'block' }}>Team Member</span></Th>
                                    <Th><span style={{ marginBottom: 25, display: 'block' }}>Status</span></Th>
                                    <Th><span style={{ marginBottom: 25, display: 'block' }}>Note</span></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td style={styleTdWhiteRight} >
                                        <img style={{ width: 50, height: 50, borderRadius: '50%', margin: '0 10px 0 7px' }} alt="active user avatar" src="data:image/jpeg;base64,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" />
                                        <div>
                                            <span style={{ display: 'block', fontWeight: 'bold', textAlign: 'left' }}>Abu Bakar</span>
                                            <span style={{ fontWeight: 'normal', textAlign: 'left', fontSize: '0.95em', marginTop: -3, display: 'block' }}>Developer Team Manager</span>
                                        </div></Td>
                                    <Td style={styleTdWhiteLeft} >
                                        <form onSubmit={this.handleFormSubmit} style={{ display: 'flex', justifyContent: 'center' }}>

                                            <div className="form-check" style={this.state.selectedOption === "option1" ? formCheckBussy : formCheck}>
                                                <label
                                                    style={this.state.selectedOption === "option1" ? whiteText : blackText}
                                                >
                                                    <input
                                                        disabled={this.state.isActive}
                                                        type="radio"
                                                        name="react-tips"
                                                        value="option1"
                                                        checked={this.state.selectedOption === "option1"}
                                                        onChange={this.handleOptionChange}
                                                        className="form-check-input"
                                                        style={this.state.isActive ?
                                                            { marginTop: 0, display: 'none' } :
                                                            { marginTop: 0, display: 'block' }}
                                                    />
                                                    BUSSY
    </label>
                                            </div>

                                            <div className="form-check" style={this.state.selectedOption === "option2" ? formCheckFree : formCheck}>
                                                <label
                                                    style={this.state.selectedOption === "option2" ? whiteText : blackText}
                                                >
                                                    <input
                                                        disabled={this.state.isActive}
                                                        type="radio"
                                                        name="react-tips"
                                                        value="option2"
                                                        checked={this.state.selectedOption === "option2"}
                                                        onChange={this.handleOptionChange}
                                                        className="form-check-input"
                                                        style={this.state.isActive ?
                                                            { marginTop: 0, display: 'none' } :
                                                            { marginTop: 0, display: 'block' }}
                                                    />
                                                    FREE
    </label>
                                            </div>

                                            <div className="form-check" style={this.state.selectedOption === "option3" ? formCheckLearn : formCheck}>
                                                <label
                                                    style={this.state.selectedOption === "option3" ? whiteText : blackText}
                                                >
                                                    <input
                                                        disabled={this.state.isActive}
                                                        type="radio"
                                                        name="react-tips"
                                                        value="option3"
                                                        checked={this.state.selectedOption === "option3"}
                                                        onChange={this.handleOptionChange}
                                                        className="form-check-input"
                                                        style={this.state.isActive ?
                                                            { marginTop: 0, display: 'none' } :
                                                            { marginTop: 0, display: 'block' }}
                                                    />
                                                    LEARN
    </label>
                                            </div>

                                            <div className="form-group">
                                                <button className="btn btn-primary" type="submit" style={
                                                    this.state.isActive ?
                                                        { display: 'none' } :
                                                        {
                                                            display: 'block',
                                                            marginTop: 16,
                                                            borderRadius: '50%',
                                                            padding: '2px 8px 6px 8px',
                                                            marginLeft: 10,
                                                            backgroundImage: 'linear-gradient(45deg, #FF0488, #FD9D4A)',
                                                            border: '#eeeeee'
                                                        }
                                                }>
                                                    {/* <svg style={{ width: 15, height: 15 }} xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.873 477.873" ><g><g>
                                                        <g>
                                                            <path d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2    c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067    S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2    c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z" data-original="#000000" className="active-path" data-old_color="#000000" fill="#FFFFFF" />
                                                        </g>
                                                    </g><g>
                                                            <g>
                                                                <path d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937    c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585    c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13    l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z" data-original="#000000" className="active-path" data-old_color="#000000" fill="#FFFFFF" />
                                                            </g>
                                                        </g></g> </svg> */}
                                                    <svg style={{ width: 15, height: 15 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 -46 417.81333 417" className=""><g><path d="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0" data-original="#000000" className="active-path" data-old_color="#000000" fill="#FFFFFF" /></g> </svg>
                                                </button>
                                            </div>

                                        </form>
                                    </Td>
                                    <Td style={{ position: 'relative' }}>
                                        <span style={borderWhite}>Sedang sibuk mengatur instance karmagroup dev. di GCP</span>
                                        <div style={{ position: 'absolute', marginTop: -53, right: -60 }}>
                                            <BootstrapSwitchButton
                                                checked={this.state.isActive}
                                                onlabel='Off'
                                                onstyle='danger'
                                                offlabel='On'
                                                offstyle='success'
                                                onChange={(checked) => {
                                                    this.setState({ isActive: checked, selectedOption: this.state.selectedOptionFinal })
                                                    console.log(this.state.isActive)
                                                }}
                                            />
                                        </div>
                                    </Td>
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
                                {this.state.dataUsers.map((item) => {
                                    return <Tr key={item.user_id} name={item.user_name} >
                                        <Td>{item.user_name}</Td>
                                        <Td>Bussy</Td>
                                        <Td>Oprek GCP</Td>
                                    </Tr>
                                })}
                            </Tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}
