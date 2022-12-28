import React from "react";
import { Table } from "react-bootstrap";

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
                </tr>
            </thead>
            <tbody>
                {!pekerjaans || pekerjaans.length <= 0 ? (
                    <tr>
                        <td colSpan={3}>
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
                        </tr>
                    ))
                )}
            </tbody>
        </Table>
    );
};

export default PekerjaanList;