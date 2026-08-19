pipeline {
    agent {
        docker {
            image 'node:20-alpine'
            args '--user root -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

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
                    sh 'node --version'
                    sh 'npm --version'
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
