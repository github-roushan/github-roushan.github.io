
import React from 'react';
import { FaAws } from 'react-icons/fa';
import {
  SiPython, SiCplusplus, SiOpenjdk, SiGo, SiRust, SiTypescript, SiPerl,
  SiSpringboot, SiReact, SiNodedotjs, SiFlutter, SiTensorflow, SiScikitlearn,
  SiBoost, SiSfml, SiGrpc, SiProtobuf, SiJasmine, SiJunit5, SiSelenium,
  SiMongodb, SiNeo4J, SiMysql, SiPostgresql, SiInfluxdb,
  SiGooglecloud, SiFirebase, SiDocker, SiGit, SiApachecassandra, SiAmazondynamodb,
  SiKubernetes
} from 'react-icons/si';
import GrpcIcon from '../assets/GrpcIcon';
import ProtobufIcon from '../assets/ProtobufIcon';

export const skills = {
  "Programming Languages": [
    { name: "Python", icon: <SiPython className="text-yellow-300" /> },
    { name: "C++", icon: <SiCplusplus className="text-blue-600" /> },
    { name: "Java", icon: <SiOpenjdk className="text-red-500" /> },
    { name: "Golang", icon: <SiGo className="text-cyan-500" /> },
    { name: "Rust", icon: <SiRust className="text-orange-500" /> },
    { name: "Typescript", icon: <SiTypescript className="text-blue-500" /> },
    { name: "Perl", icon: <SiPerl className="text-blue-300" /> }
  ],
  "Frameworks & Libraries": [
    { name: "Spring Boot", icon: <SiSpringboot className="text-green-500" /> },
    { name: "React", icon: <SiReact className="text-cyan-400" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
    { name: "Flutter", icon: <SiFlutter className="text-blue-400" /> },
    { name: "TensorFlow", icon: <SiTensorflow className="text-orange-500" /> },
    { name: "scikit-learn", icon: <SiScikitlearn className="text-orange-400" /> },
    { name: "LangChain", icon: null },
    { name: "Scapy", icon: null },
    { name: "Boost", icon: <SiBoost className="text-blue-500" /> },
    { name: "SFML", icon: <SiSfml className="text-green-400" /> },
    { name: "gRPC", icon: <GrpcIcon className="w-6 h-6 text-teal-500" /> },
    { name: "Protobuf", icon: <ProtobufIcon className="w-6 h-6 text-blue-500" /> },
    { name: "Jasmine", icon: <SiJasmine className="text-purple-500" /> },
    { name: "Mockito", icon: null },
    { name: "JUnit", icon: <SiJunit5 className="text-red-500" /> },
    { name: "Selenium", icon: <SiSelenium className="text-green-500" /> }
  ],
  "Databases": [
    { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
    { name: "MySQL", icon: <SiMysql className="text-blue-500" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
    { name: "InfluxDB", icon: <SiInfluxdb className="text-purple-500" /> },
    { name: "Neo4j", icon: <SiNeo4J className="text-blue-500" /> },
    { name: "Cassandra", icon: <SiApachecassandra className="text-blue-500" /> },
    { name: "AWS DynamoDB", icon: <SiAmazondynamodb className="text-orange-500" /> }
  ],
  "Cloud & DevOps": [
    { name: "AWS", icon: <FaAws className="text-orange-500" /> },
    { name: "GCP", icon: <SiGooglecloud className="text-blue-500" /> },
    { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
    { name: "Docker", icon: <SiDocker className="text-blue-500" /> },
    { name: "Kubernetes", icon: <SiKubernetes className="text-blue-600" /> },
    { name: "Git", icon: <SiGit className="text-red-500" /> }
  ],
  "Other Technical Skills": [
    { name: "Backend Development", icon: null },
    { name: "Frontend Development", icon: null },
    { name: "System Design", icon: null },
    { name: "Distributed Systems", icon: null },
    { name: "Networking", icon: null },
    { name: "Design Patterns", icon: null },
    { name: "Concurrency", icon: null },
    { name: "Testing", icon: null },
    { name: "Machine Learning", icon: null }
  ]
};

