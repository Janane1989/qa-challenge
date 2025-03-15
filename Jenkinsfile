pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js and dependencies
                    sh 'npm install'
                    // Install Playwright browsers
                    sh 'npx playwright install'
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    // Run Playwright tests
                    sh 'npx playwright test'
                }
            }
        }
        stage('Archive Test Results') {
            steps {
                script {
                    // Archive the test results and videos/screenshots (optional)
                    archiveArtifacts allowEmptyArchive: true, artifacts: 'test-results/**'
                }
            }
        }
    }
}
