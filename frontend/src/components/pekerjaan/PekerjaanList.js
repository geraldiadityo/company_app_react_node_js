import React from "react";
import { Table } from "react-bootstrap";
import RemConfirmPekerjaan from "./RemConfirmPekerjaan";

const PekerjaanList = (props) => {
    const pekerjaans = props.pekerjaans;

    return (
        <Table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Pekerjaan</th>
                    <th>File</th>
                    <th>Employee</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {!pekerjaans || pekerjaans.length <= 0 ? (
                    <tr>
                        <td colSpan={4} align="center">
                            ops! no data here!
                        </td>
                    </tr>
                ) : (
                    pekerjaans.map((pekerjaan, index) => (
                        <tr key={pekerjaan.id}>
                            <td>{index+1}</td>
                            <td>{pekerjaan.nama}</td>
                            <td>{pekerjaan.filekerja}</td>
                            <td>{pekerjaan.employee.ename}</td>
                            <td>
                                <RemConfirmPekerjaan resetState={props.resetState}
                                id={pekerjaan.id}
                                setMessageNotif={props.setMessageNotif}
                                toggleNotif={props.toggleNotif}
                                />
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </Table>
    );
};

export default PekerjaanList;