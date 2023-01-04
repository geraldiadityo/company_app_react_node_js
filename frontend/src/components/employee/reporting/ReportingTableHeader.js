import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = '#3778C2'
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderBottomColor:'#3778C2',
        backgroundColor:'#3778C2',
        color:'#fff',
        borderBottomWidth:1,
        alignItems:'center',
        height:24,
        textAlign:"center",
        fontStyle:"bold",
        flexGrow:1,
    },
    ename:{
        width:'40%',
        borderRightColor:borderColor,
        borderRightWidth:1,

    },
    jabatan:{
        width:'40%',
        borderRightColor:borderColor,
        borderRightWidth:1,
    },
    salary:{
        width:'20%',

    },
});

const ReportingTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.ename}>Employee Name</Text>
        <Text style={styles.jabatan}>Jabatan</Text>
        <Text style={styles.salary}>Salary</Text>
    </View>
);

export default ReportingTableHeader;

