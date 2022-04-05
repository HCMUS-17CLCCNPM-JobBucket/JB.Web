import React from "react";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Image,
} from "@react-pdf/renderer";

export default function Template(props) {

  Font.register({
    family: "NunitoBold",
    src: "/font/Nunito-Bold.ttf",
  });

  Font.register({
    family: "NunitoRegular",
    src: "/font/Nunito-Regular.ttf",
  });

  const styles = StyleSheet.create({
    page: {
      padding: "50 30",
      backgroundColor: "white",
      fontSize: 12,
      fontFamily: "NunitoRegular",
    },
    workView: {
      width: "45%",
      marginLeft: 20,
    },
    avatar: {
      height: "auto",
      width: 150,
    },
    infos: {
      marginVertical: 2,
      flexDirection: "row",
    },
    icon: {
      width: 15,
      height: 15,
      marginRight: 10,
    },
    introArea: {
      width: "50%",
    },
    granduated: {
      fontFamily: "NunitoBold",
      color: "#1e88e5",
      marginRight: 5,
    },

    studying: {
      fontFamily: "NunitoBold",
      color: "#f8d768",
      marginRight: 5,
    },

    contactArea: {
      justifyContent: "center",
    },
    Name: {
      fontSize: 20,
      marginBottom: 2,
      marginTop: 20,
      fontFamily: "NunitoBold",
      color: "#1e88e5",
    },
    Description: {
      fontFamily: "NunitoBold",
      color: "#1e88e5",
    },
    contact: {
      justifyContent: "space-between",
    },
    introduction: {
      marginTop: 20,
    },
    destext: {
      display: "flex",
      width: 130,
      marginRight: 10,
    },
    workElement: {
      display: "flex",
      flexDirection: "column",
      marginBottom: 15,
    },
    exArea: {
      // flexDirection: "column",
    },
    exElement: {
      marginBottom: 5,
    },
    skillElement: {
      marginRight: 15,
    },
    boxblue: {
      height: 12,
      width: 12,
      backgroundColor: "#1e88e5",
    },
    boxgray: {
      height: 12,
      width: 12,
      backgroundColor: "gray",
    },
    overall: {
      display: "flex",
      flexDirection: "row",
    },
  });
  return (
    <PDFViewer width="100%" height="600px">
      <Document>
        <Page size="A4" style={styles.page} orientation="portrait" wrap>
          <View style={styles.overall}>
            <View style={styles.introArea}>
              {props.cv.avatar != "" && props.cv.avatar != null && (
                <Image style={styles.avatar} src={props.cv.avatar}></Image>
              )}
              <Text style={styles.Name}>{props.cv.name}</Text>
              <View style={styles.contact}>
                {props.cv.email != "" && props.cv.email != null && (
                  <View style={styles.infos}>
                    <Image style={styles.icon} src="/email.png"></Image>
                    <Text>{props.cv.email}</Text>
                  </View>
                )}
                {props.cv.phonenumber != "" && props.cv.phonenumber != null && (
                  <View style={styles.infos}>
                    <Image style={styles.icon} src="/call.png"></Image>
                    <Text>{props.cv.phonenumber}</Text>
                  </View>
                )}
                {props.cv.address != "" && props.cv.address != null && (
                  <View style={styles.infos}>
                    <Image style={styles.icon} src="/home.png"></Image>
                    <Text>{props.cv.address}</Text>
                  </View>
                )}
                {props.cv.website != "" && props.cv.website != null && (
                  <View style={styles.infos}>
                    <Image style={styles.icon} src="/global.png"></Image>
                    <Text>{props.cv.website}</Text>
                  </View>
                )}
                {props.cv.github != "" && props.cv.github != null && (
                  <View style={styles.infos}>
                    <Image style={styles.icon} src="/github.png"></Image>
                    <Text>{props.cv.github}</Text>
                  </View>
                )}
                {props.cv.reference != null && props.cv.reference != "" && (
                  <View style={styles.infos}>
                    <Image style={styles.icon} src="/reference.jpg"></Image>
                    <Text>{props.cv.reference}</Text>
                  </View>
                )}
                {props.cv.birthDate != "" && props.cv.birthDate != null && (
                  <View style={styles.infos}>
                    <Image style={styles.icon} src="/calendar.png"></Image>
                    <Text>
                      {moment(props.cv.birthDate).format("DD/MM/YYYY")}
                    </Text>
                  </View>
                )}
                {props.cv.gender != "" && props.cv.gender != null && (
                  <View style={styles.infos}>
                    <Image style={styles.icon} src="/gender.png"></Image>
                    <Text>{props.cv.gender}</Text>
                  </View>
                )}
              </View>
              <View style={styles.introduction}>
                <Text style={styles.Description}>INTRODUCTION</Text>
                <Text>{props.cv.introduction}</Text>
              </View>
            </View>
            <View style={styles.workView}>
              {props.cv.experience.length != 0 && (
                <View style={styles.workElement} wrap>
                  <View style={styles.destext}>
                    <Text style={styles.Description}>WORKS EXPERIENCES</Text>
                  </View>
                  <View style={styles.exArea}>
                    {props.cv.experience.map((data) => (
                      <View style={styles.exElement}>
                        <Text style={styles.Description}>{data.company}</Text>
                        <Text>{data.position}</Text>
                        <Text>{data.duration} </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
              {props.cv.education.length != 0 && (
                <View style={styles.workElement} wrap>
                  <View style={styles.destext}>
                    <Text style={styles.Description}>EDUCATION</Text>
                  </View>
                  <View style={styles.exArea}>
                    {props.cv.education.map((data) => (
                      <View style={styles.exElement}>
                        {data.status == "Graduated" ? (
                          <View style={styles.overall}>
                            <Text style={styles.granduated}>{data.school}</Text>
                            <Image
                              style={styles.icon}
                              src="/graduation.png"
                            ></Image>
                          </View>
                        ) : (
                          <View style={styles.overall}>
                            <Text style={styles.studying}>{data.school}</Text>
                            <Image
                              style={styles.icon}
                              src="/reading-book.png"
                            ></Image>
                          </View>
                        )}
                        <Text>{data.major}</Text>
                        <Text>{data.profession}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {props.cv.skill.length != 0 && (
                <View style={styles.workElement} wrap>
                  <View style={styles.destext}>
                    <Text style={styles.Description}>SKILLS</Text>
                  </View>
                  <View wrap>
                    {props.cv.skill.map((data) => (
                      <View style={styles.skillElement}>
                        <Text>{data.skillName}</Text>
                        <View style={styles.overall}>
                          {[...Array(parseInt(data.level))].map(() => (
                            <View style={styles.boxblue}></View>
                          ))}
                          {[...Array(5 - parseInt(data.level))].map(() => (
                            <View style={styles.boxgray}></View>
                          ))}
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              )}
              {props.cv.activity.length != 0 && (
                <View style={styles.workElement} wrap>
                  <View style={styles.destext}>
                    <Text style={styles.Description}>ACTIVITIES</Text>
                  </View>
                  <View style={styles.exArea}>
                    {props.cv.activity.map((data) => (
                      <View style={styles.exElement}>
                        <Text>{data}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
              {props.cv.certification.length != 0 && (
                <View style={styles.workElement} wrap>
                  <View style={styles.destext}>
                    <Text style={styles.Description}>CERTIFICATIONS</Text>
                  </View>
                  <View style={styles.exArea}>
                    {props.cv.certification.map((data) => (
                      <View style={styles.exElement}>
                        <Text>{data}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
              {props.cv.award.length != 0 && (
                <View style={styles.workElement} wrap>
                  <View style={styles.destext}>
                    <Text style={styles.Description}>AWARDS</Text>
                  </View>
                  <View style={styles.exArea}>
                    {props.cv.award.map((data) => (
                      <View style={styles.exElement}>
                        <Text>{data}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
