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
        script {
            def scannerHome = tool 'sonarscanner'

            withSonarQubeEnv('sonarqube') {
                sh """
                    ${scannerHome}/bin/sonar-scanner \
                      -Dsonar.projectKey=node-express-app \
                      -Dsonar.projectName="Node Express App" \
                      -Dsonar.sources=node-app \
                      -Dsonar.exclusions=node-app/node_modules/**,node-app/coverage/** \
                      -Dsonar.sourceEncoding=UTF-8
                """
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
