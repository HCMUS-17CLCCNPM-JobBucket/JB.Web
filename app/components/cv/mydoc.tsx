import React from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

export default function mydoc() {
  return (
    <Document>
      <Document>
        <Page size="A4">
          <View>
            <Text>Section #1</Text>
          </View>
          <View>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    </Document>
  );
}
