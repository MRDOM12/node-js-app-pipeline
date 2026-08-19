pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build and Test') {
            steps {
                dir('node-app') {
                    sh 'npm ci'
                    sh 'npm test'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                dir('node-app') {
                    withSonarQubeEnv('sonarqube') {
                        sh '''
                            npx sonar-scanner \
                              -Dsonar.projectKey=node-express-app \
                              -Dsonar.projectName="Node Express App" \
                              -Dsonar.sources=. \
                              -Dsonar.exclusions=node_modules/**,coverage/** \
                              -Dsonar.host.url=$SONAR_HOST_URL
                        '''
                    }
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
