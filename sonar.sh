#!/bin/bash

PULLS_NUMBER=$1
SONAR_HOST=$2
SONAR_USERNAME=$3
SONAR_PASSWORD=$4
GITHUB_OAUTH=$5 

if [ $PULLS_NUMBER = 'false' ]; then
  exit  
fi

mvn org.sonarsource.scanner.maven:sonar-maven-plugin:3.0.1:sonar -Dmaven.test.skip=true -Dclirr=true -Dsonar.host.url=${SONAR_HOST} -Dsonar.login=${SONAR_USERNAME} -Dsonar.password=${SONAR_PASSWORD} -Dsonar.sourceEncoding=UTF-8 -Dsonar.analysis.mode=issues -Dsonar.github.pullRequest=${PULLS_NUMBER} -Dsonar.github.oauth=${GITHUB_OAUTH} -Dsonar.github.repository=ka-hirose/SonarQubeTest -B -e -V