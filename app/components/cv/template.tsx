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

export default function Template(props) {
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
      // flexDirection: "column",
    },
    avatar: {
      width: "auto",
      height: 150,
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
      flexDirection: "row",
    },
    granduated: {
      fontFamily: "NunitoBold",
      color: props.color,
      marginRight: 5,
    },

    studying: {
      fontFamily: "NunitoBold",
      color: "#f8d768",
      marginRight: 5,
    },

    contactArea: {
      marginLeft: 20,
      // flexDirection: "column",
      justifyContent: "center",
    },
    Name: {
      fontSize: 26,
      marginBottom: 2,
      width: "65%",
      fontFamily: "NunitoBold",
      color: props.color,
    },
    Description: {
      fontFamily: "NunitoBold",
      color: "#1e88e5",
    },
    contact: {
      width: "65%",
      justifyContent: "space-between",
    },
    introduction: {
      marginVertical: 15,
    },
    destext: {
      display: "flex",
      width: 130,
      alignItems: "flex-end",
      marginRight: 10,
    },
    workElement: {
      width: "70%",
      display: "flex",
      flexDirection: "row",
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
  });
  return (
    <PDFViewer width="100%" height="600px">
      <Document>
        <Page size="A4" style={styles.page} orientation="portrait" wrap>
          <View style={styles.introArea}>
            {cv.avatar != "" && cv.avatar != null && (
              <Image style={styles.avatar} src={cv.avatar}></Image>
            )}
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
              <View style={styles.workElement} wrap>
                <View style={styles.destext}>
                  <Text style={styles.Description}>WORKS EXPERIENCES</Text>
                </View>
                <View style={styles.exArea}>
                  {experienceList.map((data) => (
                    <View style={styles.exElement}>
                      <Text style={styles.Description}>{data.company}</Text>
                      <Text>{data.position}</Text>
                      <Text>{data.duration} </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            {EducationList.length != 0 && (
              <View style={styles.workElement} wrap>
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
              <View style={styles.workElement} wrap>
                <View style={styles.destext}>
                  <Text style={styles.Description}>SKILLS</Text>
                </View>
                <View wrap>
                  {SkillList.map((data) => (
                    <View style={styles.skillElement}>
                      <Text>{data.skillName}</Text>
                      <View style={styles.introArea}>
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
            {ActivityList.length != 0 && (
              <View style={styles.workElement} wrap>
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
              <View style={styles.workElement} wrap>
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
              <View style={styles.workElement} wrap>
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
