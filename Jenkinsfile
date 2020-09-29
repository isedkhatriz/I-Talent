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
        BACKEND_IMAGE_NAME = "dsd-italent-backend"
        FRONTEND_IMAGE_NAME = "dsd-italent-frontend"
        BACKEND_DIR = "services/backend"
        FRONTEND_DIR = "services/frontend-v3"
        NODE_ENV = "production"
    }

    stages {
//        stage('build'){
            //parallel{
                stage('node setup') {
                    steps {
                        sh """
                            source $NVM_DIR/nvm.sh
                            nvm install 12.6.0
                            nvm use 12.6.0
                            nvm --version
                        """
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
        
//            }
  //      }


    }
}
