# This file is part of the searchreplace package.
#
# (c) Mathieu Ledru <matyo91@gmail.com>
#
# For the full copyright and license information, please view the LICENSE
# file that was distributed with this source code.

###
@class DefaultFilter
###
define ->
  "use strict"

  class SRFilter
    ###
    @param {*} input
    @returns {*}
    ###
    update: (input) ->
      input

  SRFilter