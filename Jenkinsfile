pipeline {
    agent any

    triggers {
        githubPush()
        cron('H 2 * * 1-5')
    }

    environment {
        DOCKER_IMAGE_NAME = 'adactin-playwright-jenkins'
        DOCKER_IMAGE_BUILT = 'false'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker image') {
            steps {
                sh 'docker build --tag "$DOCKER_IMAGE_NAME:$BUILD_NUMBER" .'
                script {
                    env.DOCKER_IMAGE_BUILT = 'true'
                }
            }
        }

        stage('Run Playwright tests') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'adactin-credentials',
                    usernameVariable: 'ADACTIN_USERNAME',
                    passwordVariable: 'ADACTIN_PASSWORD'
                )]) {
                    sh '''
                        rm -rf allure-results
                        mkdir -p playwright-report allure-results test-results
                        docker run --rm \
                          -e CI=true \
                          -e ADACTIN_USERNAME \
                          -e ADACTIN_PASSWORD \
                          -v "$WORKSPACE/playwright-report:/app/playwright-report" \
                          -v "$WORKSPACE/allure-results:/app/allure-results" \
                          -v "$WORKSPACE/test-results:/app/test-results" \
                          "$DOCKER_IMAGE_NAME:$BUILD_NUMBER"
                    '''
                }
            }
        }
    }

    post {
        always {
            script {
                if (env.DOCKER_IMAGE_BUILT == 'true' && fileExists('allure-results')) {
                    sh '''
                        docker run --rm \
                          -v "$WORKSPACE/allure-results:/app/allure-results" \
                          -v "$WORKSPACE/allure-report:/app/allure-report" \
                          --entrypoint npm \
                          "$DOCKER_IMAGE_NAME:$BUILD_NUMBER" \
                          run allure:generate
                    '''
                    allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
                }
            }
            archiveArtifacts(
                artifacts: 'playwright-report/**, allure-results/**, allure-report/**, test-results/**',
                allowEmptyArchive: true,
                fingerprint: true
            )
        }
    }
}
