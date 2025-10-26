# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION 3.5)

file(MAKE_DIRECTORY
  "/home/flyingthings/flur/flubogenV2-main/flubogenV2-main/FlubogenV2-main/FlubogenV2-main/protobrain2/build/_deps/picotool-src"
  "/home/flyingthings/flur/flubogenV2-main/flubogenV2-main/FlubogenV2-main/FlubogenV2-main/protobrain2/build/_deps/picotool-build"
  "/home/flyingthings/flur/flubogenV2-main/flubogenV2-main/FlubogenV2-main/FlubogenV2-main/protobrain2/build/_deps"
  "/home/flyingthings/flur/flubogenV2-main/flubogenV2-main/FlubogenV2-main/FlubogenV2-main/protobrain2/build/picotool/tmp"
  "/home/flyingthings/flur/flubogenV2-main/flubogenV2-main/FlubogenV2-main/FlubogenV2-main/protobrain2/build/picotool/src/picotoolBuild-stamp"
  "/home/flyingthings/flur/flubogenV2-main/flubogenV2-main/FlubogenV2-main/FlubogenV2-main/protobrain2/build/picotool/src"
  "/home/flyingthings/flur/flubogenV2-main/flubogenV2-main/FlubogenV2-main/FlubogenV2-main/protobrain2/build/picotool/src/picotoolBuild-stamp"
)

set(configSubDirs )
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "/home/flyingthings/flur/flubogenV2-main/flubogenV2-main/FlubogenV2-main/FlubogenV2-main/protobrain2/build/picotool/src/picotoolBuild-stamp/${subDir}")
endforeach()
if(cfgdir)
  file(MAKE_DIRECTORY "/home/flyingthings/flur/flubogenV2-main/flubogenV2-main/FlubogenV2-main/FlubogenV2-main/protobrain2/build/picotool/src/picotoolBuild-stamp${cfgdir}") # cfgdir has leading slash
endif()
