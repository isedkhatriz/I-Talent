@Library('ised-cicd-lib') _

pipeline {
    agent {
        label 'nodejs'
    }

    options {
        disableConcurrentBuilds()
    }

    environment {
        // GLobal Vars
        BACKEND_IMAGE_NAME = 'dsd-italent-backend'
        FRONTEND_IMAGE_NAME = 'dsd-italent-frontend'
        BACKEND_DIR = 'services/backend'
        FRONTEND_DIR = 'services/frontend-v3'
        SOURCE_DIR='services'
        FRONTEND_DIR_I18 = 'services/frontend-v3/src/i18n'
        NODE_ENV = 'production'
    }

    stages {
        stage('run-lints'){
            parallel{
                stage('i18-check') {
                    steps {
                        dir("${FRONTEND_DIR_I18}") {
                            sh 'npm init -y'
                            sh 'npm i lodash'
                            sh 'node check'
                        }
                    }
                }        

                stage('linting') {
                    steps {
                        dir("${SOURCE_DIR}") {
                            sh """
                                unset NPM_CONFIG_PREFIX
                                source $NVM_DIR/nvm.sh
                                nvm install "12.6.0"
                                npm i yarn -g
                                cd frontend-v3
                                yarn install --production=false
                                yarn lint
                                cd ../backend
                                yarn install --production=false
                                yarn lint
                            """
                        }
                    }
                }    
            }
        }


        stage('build-backend') {
            steps {
			    dir("${BACKEND_DIR}") {
                    script {
                        builder.buildApp(BACKEND_IMAGE_NAME)
                    }
                }
            }
        }
        
        stage('build-frontend') {
            steps {
			    dir("${FRONTEND_DIR}") {
                    script {
                        builder.buildApp(FRONTEND_IMAGE_NAME)
                    }
                }
            }
        }
    }
}
