#!/bin/bash
cd /home/kavia/workspace/code-generation/minimaltask-46515-cb8a9ba4/minimaltask_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

