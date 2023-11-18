pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh'''
                    echo "Building docker image..."
                    docker build -t products-front:v1 .
                    docker tag products-front:v1 transformation2/snt-jenkins-products-front:v$BUILD_NUMBER
                '''
            }
        }
        stage('Push') {
            steps {
                sh'''
                    echo "Pushing docker image into Dockerhub..."
                    docker push transformation2/sntjenkins-products-front:v$BUILD_NUMBER 
                '''
            }
        }
       
}
}
