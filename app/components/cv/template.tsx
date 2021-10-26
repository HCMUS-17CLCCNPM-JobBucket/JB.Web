import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cvActions } from "app/redux/features/cv";
import Moment from "react-moment";
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

export default function template() {
  const cv = useSelector((state: any) => state.cv);
  const experienceList = useSelector((state: any) => state.cv.experience);
  const EducationList = useSelector((state: any) => state.cv.education);
  const SkillList = useSelector((state: any) => state.cv.skill);
  const ActivityList = useSelector((state: any) => state.cv.activity);
  const AwardList = useSelector((state: any) => state.cv.award);
  const CertiList = useSelector((state: any) => state.cv.certification);

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
      flexDirection: "column",
    },
    avatar: {
      width: 100,
      height: 100,
    },
    infos: {
      marginVertical: 2,
      flexDirection: "row",
      alignItems: "flex-end",
    },
    icon: {
      width: 15,
      height: 15,
      marginRight: 10,
    },
    introArea: {
      flexDirection: "row",
    },
    granduated: {
      fontFamily: "NunitoBold",
      color: "#1e88e5",
      marginRight: 5,
    },

    studying: {
      fontFamily: "NunitoBold",
      color: "red",
      marginRight: 5,
    },

    contactArea: {
      marginLeft: 20,
      flexDirection: "column",
      justifyContent: "center",
    },
    Name: {
      fontSize: 26,
      marginBottom: 2,
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
      marginVertical: 15,
    },
    destext: {
      width: 130,
      alignItems: "flex-end",
      marginRight: 10,
    },
    workElement: {
      flexDirection: "row",
      marginBottom: 15,
    },
    exArea: {
      flexDirection: "column",
    },
    exElement: {
      marginBottom: 5,
    },
    skillElement: {
      marginRight: 15,
    },
  });
  return (
    <PDFViewer width="490px" height="650px">
      <Document>
        <Page size="A4" style={styles.page} orientation="portrait">
          <View style={styles.introArea}>
            <Image style={styles.avatar} src={cv.avatar}></Image>
            <View style={styles.contactArea}>
              <Text style={styles.Name}>{cv.name}</Text>
              <View style={styles.contact}>
                {cv.email != "" && cv.email != null && (
                  <View style={styles.infos}>
                    <Image style={styles.icon} src="/email.png"></Image>
                    <Text>{cv.email}</Text>
                  </View>
                )}
                {cv.phonenumber != "" && cv.phonenumber != null && (
                  <View style={styles.infos}>
                    <Image style={styles.icon} src="/call.png"></Image>
                    <Text>{cv.phonenumber}</Text>
                  </View>
                )}
                {cv.address != "" && cv.address != null && (
                  <View style={styles.infos}>
                    <Image style={styles.icon} src="/home.png"></Image>
                    <Text>{cv.address}</Text>
                  </View>
                )}
                {cv.website != "" && cv.website != null && (
                  <View style={styles.infos}>
                    <Image style={styles.icon} src="/global.png"></Image>
                    <Text>{cv.website}</Text>
                  </View>
                )}
                {cv.github != "" && cv.github != null && (
                  <View style={styles.infos}>
                    <Image style={styles.icon} src="/github.png"></Image>
                    <Text>{cv.github}</Text>
                  </View>
                )}
                {cv.reference != null && cv.reference != "" && (
                  <View style={styles.infos}>
                    <Image style={styles.icon} src="/reference.jpg"></Image>
                    <Text>{cv.reference}</Text>
                  </View>
                )}
                {cv.birthDate != "" && cv.birthDate != null && (
                  <View style={styles.infos}>
                    <Image style={styles.icon} src="/calendar.png"></Image>
                    <Text>{moment(cv.birthDate).format("DD/MM/YYYY")}</Text>
                  </View>
                )}
                {cv.gender != "" && cv.gender != null && (
                  <View style={styles.infos}>
                    <Image style={styles.icon} src="/gender.png"></Image>
                    <Text>{cv.gender}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={styles.introduction}>
            <Text>{cv.introduction}</Text>
          </View>
          <View style={styles.workView}>
            {experienceList.length != 0 && (
              <View style={styles.workElement}>
                <View style={styles.destext}>
                  <Text style={styles.Description}>WORKS EXPERIENCES</Text>
                </View>
                <View style={styles.exArea}>
                  {experienceList.map((data) => (
                    <View style={styles.exElement}>
                      <Text style={styles.Description}>{data.company}</Text>
                      <Text>{data.position}</Text>
                      <Text>{data.duration + " months"} </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            {EducationList.length != 0 && (
              <View style={styles.workElement}>
                <View style={styles.destext}>
                  <Text style={styles.Description}>EDUCATION</Text>
                </View>
                <View style={styles.exArea}>
                  {EducationList.map((data) => (
                    <View style={styles.exElement}>
                      {data.status == "Graduated" ? (
                        <View style={styles.introArea}>
                          <Text style={styles.granduated}>{data.school}</Text>
                          <Image
                            style={styles.icon}
                            src="/graduation.png"
                          ></Image>
                        </View>
                      ) : (
                        <View style={styles.introArea}>
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

            {SkillList.length != 0 && (
              <View style={styles.workElement}>
                <View style={styles.destext}>
                  <Text style={styles.Description}>SKILLS</Text>
                </View>
                {SkillList.map((data) => (
                  <View style={styles.skillElement}>
                    <Text>{data.skillName}</Text>
                  </View>
                ))}
              </View>
            )}
            {ActivityList.length != 0 && (
              <View style={styles.workElement}>
                <View style={styles.destext}>
                  <Text style={styles.Description}>ACTIVITIES</Text>
                </View>
                <View style={styles.exArea}>
                  {ActivityList.map((data) => (
                    <View style={styles.exElement}>
                      <Text>{data}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            {CertiList.length != 0 && (
              <View style={styles.workElement}>
                <View style={styles.destext}>
                  <Text style={styles.Description}>CERTIFICATIONS</Text>
                </View>
                <View style={styles.exArea}>
                  {CertiList.map((data) => (
                    <View style={styles.exElement}>
                      <Text>{data}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            {AwardList.length != 0 && (
              <View style={styles.workElement}>
                <View style={styles.destext}>
                  <Text style={styles.Description}>AWARDS</Text>
                </View>
                <View style={styles.exArea}>
                  {AwardList.map((data) => (
                    <View style={styles.exElement}>
                      <Text>{data}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
