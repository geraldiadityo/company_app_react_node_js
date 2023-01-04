import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { FormatRupiah } from "@arismun/format-rupiah";

const borderColor = '#3778C2'
const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        borderBottomColor:'#3778C2',
        borderBottomWidth:1,
        alignItems:'center',
        height:24,
        fontSize:12,
        fontStyle:'bold',
    },
    description:{
        width:'80%',
        textAlign:'right',
        borderRightColor:borderColor,
        borderRightWidth:1,
        paddingRight:8,
    },
    total:{
        width:'20%',
        textAlign:'right',
        paddingRight:8,
    },
});

const ReportingTableFooter = (props) => {
    const total = props.items.map(item => item.jabatan.salary).reduce((accumulator,currnetValue) => accumulator + currnetValue, 0);
    return (
        <View style={styles.row}>
            <Text style={styles.description}>Total</Text>
            <Text style={styles.total}>
                <FormatRupiah value={total}></FormatRupiah>
            </Text>
        </View>
    );
};

export default ReportingTableFooter;
