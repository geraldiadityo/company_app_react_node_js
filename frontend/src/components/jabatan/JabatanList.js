import React from "react";
import { Table } from "react-bootstrap";
import AddJabatanModal from "./AddJabatanModal";
import RemConfirmJabatan from "./RemConfirmJabatan";

const JabatanList = (props) => {
    const jabatans = props.jabatans;

    return (
        <Table variant="dark">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Salary</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {!jabatans || jabatans.length <= 0 ? (
                    <tr>
                        <td colSpan={4} align="center">
                            ops! no data here!
                        </td>
                    </tr>
                ) : (
                    jabatans.map((jabatan,index) => (
                        <tr key={jabatan.id}>
                            <td>{index+1}</td>
                            <td>{jabatan.name}</td>
                            <td>{jabatan.salary}</td>
                            <td>
                                <AddJabatanModal create={false} jabatan={jabatan}
                                resetState={props.resetState}
                                toggleNotif={props.toggleNotif}
                                setMessageNotif={props.setMessageNotif}/>
                                &nbsp;
                                &nbsp;
                                <RemConfirmJabatan id={jabatan.id}
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

export default JabatanList;