import React from "react";
import { Page, Document, StyleSheet } from "@react-pdf/renderer";
import ReportingTitle from "./ReportingTitle";
import ReportingTableItem from "./ReportingTableItem";

const styles = StyleSheet.create({
    page:{
        backgroundColor:'#fff',
        fontSize:11,
        paddingTop:30,
        paddingLeft:50,
        paddingRight:50,
        lineHeight:1.5,
        flexDirection:'column',
    },
});

const PdfDocument = (props) => {
    
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <ReportingTitle/>
                <ReportingTableItem datas={props.employees}/>
            </Page>
        </Document>
    );
};

export default PdfDocument;
