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
                    branches: [[name: 'main']],
                    userRemoteConfigs: [[url: 'https://github.com/DeveloperTiwariji/Dockerized_DevTinder.git']],
                    extensions: [[$class: 'CleanCheckout'], [$class: 'CloneOption', noTags: false, shallow: false, depth: 0]]
                ])
            }
        }

        stage('Debug Workspace') {
            steps {
                sh 'ls -la'
                sh 'ls -la devTinder-web'
                sh 'ls -la DevTinder_Backend'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('devTinder-web') {
                    script {
                        if (fileExists('Dockerfile')) {
                            sh 'docker build -t $FRONTEND_IMAGE:latest .'
                        } else {
                            error "Dockerfile not found in devTinder-web directory"
                        }
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('DevTinder_Backend') {
                    script {
                        if (fileExists('Dockerfile')) {  // <-- Corrected here (capital D)
                            sh 'docker build -t $BACKEND_IMAGE:latest .'
                        } else {
                            error "Dockerfile not found in DevTinder_Backend directory"
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
                sh 'docker push $FRONTEND_IMAGE:latest'
                sh 'docker push $BACKEND_IMAGE:latest'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh '''
                    docker-compose down || true
                    docker-compose up --build -d
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
