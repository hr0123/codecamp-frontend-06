# Windows: 우분투 설치
# FROM ubuntu:20.04

FROM node:14

# 커서 둘 위치 설정->아래 RUN(=CMD)명령어들 실행시킬 위치(CMD명령어는 한번밖에 못씀)
WORKDIR /class_build/
# 현재 있는 모든 파일을 Docker Linux 안에 class_build라는 폴더를 만들어서 그 안에 복붙(RUN mkdir class_build 불필요)(=>RUN git clone 불필요)
COPY . /class_build/

RUN yarn install
RUN yarn build:ssr
# RUN yarn start
CMD yarn start


# Dockerfile자체도 build 해줘야함 =>압축된 하나의 이미지 파일이 나옴 =>그 파일을 실행해 한번에 셋팅