import React from "react";
import { Table } from "react-bootstrap";
import AddEmployeeModal from "./AddEmployeeModal";
import RemConfirmEmployee from "./RemConfirmEmployee";

const EmployeeList = (props) => {
    const employess = props.employess;

    return (
        <Table variant="dark">
            <thead>
                <tr>
                    <th>No</th>
                    <th>EID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Jabatan</th>
                    <th>Salary</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {!employess || employess.length <= 0 ? (
                    <tr>
                        <td colSpan={7} align="center">
                            oops! no data
                        </td>
                    </tr>
                ) : (
                    employess.map((employee, index) => (
                        <tr key={employee.id}>
                            <td>{index+1}</td>
                            <td>{employee.eid}</td>
                            <td>{employee.ename}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.jabatan.name}</td>
                            <td>{employee.jabatan.salary}</td>
                            <td>
                                <AddEmployeeModal create={false}
                                employee={employee}
                                resetState={props.resetState}
                                toggleNotif={props.toggleNotif}
                                setMessageNotif={props.setMessageNotif}/>
                                &nbsp;
                                &nbsp;
                                <RemConfirmEmployee id={employee.id}
                                resetState={props.resetState}
                                toggleNotif={props.toggleNotif}
                                setMessageNotif={props.setMessageNotif}/>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </Table>
    );
};

export default EmployeeList;
