import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { FormatRupiah } from "@arismun/format-rupiah";
const borderColor = "#3778C2"
const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        borderBottomColor:'#3778C2',
        borderBottomWidth:1,
        alignItems:'center',
        height:24,
        fontStyle:'bold',
    },
    ename:{
        width:'40%',
        textAlign:'left',
        borderRightColor:borderColor,
        borderRightWidth:1,
        paddingLeft:8,
    },
    jabatan:{
        width:'40%',
        textAlign:'left',
        borderRightColor:borderColor,
        borderRightWidth:1,
        paddingLeft:8,
    },
    salary:{
        width:'20%',
        textAlign:'right',
        paddingRight:8,
    },
});

const ReportingTableRows = (props) => {
    const rows = props.items.map(item => 
        <View style={styles.row} key={item.id.toString()}>
            <Text style={styles.ename}>{item.ename}</Text>
            <Text style={styles.jabatan}>{item.jabatan.name}</Text>
            <Text style={styles.salary}>
                <FormatRupiah value={item.jabatan.salary}></FormatRupiah>
            </Text>
        </View>
    );
    return (<Fragment>{rows}</Fragment>)
};
export default ReportingTableRows;
