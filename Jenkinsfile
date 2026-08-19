pipeline {
    agent none

    options {
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {

        stage('Checkout') {
            agent {
                docker {
                    image 'node:20-alpine'
                    args '--user root -v /var/run/docker.sock:/var/run/docker.sock'
                }
            }

            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build and Test') {
            agent {
                docker {
                    image 'node:20-alpine'
                    args '--user root -v /var/run/docker.sock:/var/run/docker.sock'
                }
            }

            steps {
                dir('node-app') {
                    sh 'node --version'
                    sh 'npm --version'
                    sh 'npm ci'
                    sh 'npm test'
                }
            }
        }

        stage('SonarQube Analysis') {
            agent {
                docker {
                    image 'sonarsource/sonar-scanner-cli:latest'
                    args '--user root'
                }
            }

            steps {
                withSonarQubeEnv('sonarqube') {
                    sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=node-express-app \
                          -Dsonar.projectName="Node Express App" \
                          -Dsonar.sources=node-app \
                          -Dsonar.exclusions=node-app/node_modules/**,node-app/coverage/** \
                          -Dsonar.sourceEncoding=UTF-8
                    '''
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
