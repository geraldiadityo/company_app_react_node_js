import React from "react";
import {Text, View, StyleSheet} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    titleContainer:{
        marginTop:24,
    },
    reportTitle:{
        color:'#37782C',
        letterSpacing:4,
        textAlign:"center",
        textTransform:"uppercase",
    }
});

const ReportingTitle = () => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>Salary Report</Text>
    </View>
);

export default ReportingTitle;
