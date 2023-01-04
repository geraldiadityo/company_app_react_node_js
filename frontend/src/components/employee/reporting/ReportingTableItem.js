import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import ReportingTableHeader from "./ReportingTableHeader";
import ReportingTableRows from "./ReportingTableRows";
import ReportingTableFooter from "./ReportingTableFooter";

const styles = StyleSheet.create({
    tableContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:24,
        borderWidth:1,
        borderColor:'#3778C2',
    },
});

const ReportingTableItem = (props) => (
    <View style={styles.tableContainer}>
        <ReportingTableHeader/>
        <ReportingTableRows items={props.datas}/>
        <ReportingTableFooter items={props.datas}/>
    </View>
);

export default ReportingTableItem;
