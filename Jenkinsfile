pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'DeveloperTiwariji'
        FRONTEND_IMAGE = '12207441/web-image'
        BACKEND_IMAGE = '12207441/backend-image'
    }

    stages {
        stage('Clone Repo') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/DeveloperTiwariji/Dockerized-DevTinder.git'
                    ]]
                ])
            }
        }

        stage('Debug Workspace') {
            steps {
                sh 'ls -la'
                sh 'ls -la devTinder-web || true'
                sh 'ls -la DevTinder || true'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('devTinder-web') {
                    script {
                        if (fileExists('Dockerfile')) {
                            sh "docker build -t ${FRONTEND_IMAGE}:latest ."
                        } else {
                            error "Dockerfile not found in devTinder-web directory"
                        }
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('DevTinder') {
                    script {
                        if (fileExists('Dockerfile')) {
                            sh "docker build -t ${BACKEND_IMAGE}:latest ."
                        } else {
                            error "Dockerfile not found in DevTinder directory"
                        }
                    }
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                    '''
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                sh "docker push ${FRONTEND_IMAGE}:latest"
                sh "docker push ${BACKEND_IMAGE}:latest"
            }
        }

        stage('Create .env file') {
            steps {
                dir('DevTinder') {
                    writeFile file: '.env', text: '''
MONGO_URI=mongodb://mongo:27017/devtinder
JWT_SECRET=your_jwt_secret_here
PORT=3000
'''
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    if (fileExists('docker-compose.yml')) {
                        sh '''
                            docker-compose down || true
                            docker-compose up --build -d
                        '''
                    } else {
                        error "docker-compose.yml not found in workspace!"
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
