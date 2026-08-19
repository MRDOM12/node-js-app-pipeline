pipeline {

    agent {
        docker {
            image 'node:20-alpine'
            args '--user root -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    stages {

        // 1. Checkout
        stage('Checkout') {
            steps {
                echo 'Source code checked out from GitHub'
            }
        }

        // 2. Install dependencies and test application
        stage('Build and Test') {
            steps {
                dir('node-app') {
                    sh '''
                        echo "Node version:"
                        node --version

                        echo "NPM version:"
                        npm --version

                        echo "Installing dependencies..."
                        npm ci

                        echo "Running tests..."
                        npm test
                    '''
                }
            }
        }

        // 3. SonarQube code quality analysis
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

        // 4. Build Docker image
        stage('Build Docker Image') {
            steps {
                script {

                    def imageName = "gopikakt2005/ultimate-cicd:${BUILD_NUMBER}"

                    echo "Building Docker image..."
                    echo "Image: ${imageName}"

                    sh """
                        docker build \
                        -t ${imageName} \
                        node-app
                    """
                }
            }
        }

        // 5. Push Docker image to Docker Hub
        stage('Push Docker Image') {
            steps {
                script {

                    def imageName = "gopikakt2005/ultimate-cicd:${BUILD_NUMBER}"

                    echo "Pushing Docker image to Docker Hub..."

                    docker.withRegistry(
                        'https://index.docker.io/v1/',
                        'docker-cred'
                    ) {

                        def dockerImage = docker.image(imageName)

                        dockerImage.push()

                        dockerImage.push('latest')
                    }

                    echo "Docker image pushed successfully!"
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }

        success {
            echo 'SUCCESS: Build, test, SonarQube and Docker stages completed.'
        }

        failure {
            echo 'FAILURE: Check the Jenkins console output.'
        }
    }
}
