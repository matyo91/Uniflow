# Distributed under the BSD license:
#
# Copyright (c) 2013, Darkwood M.L.
# All rights reserved.
# 
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
#     * Redistributions of source code must retain the above copyright
#       notice, this list of conditions and the following disclaimer.
#     * Redistributions in binary form must reproduce the above copyright
#       notice, this list of conditions and the following disclaimer in the
#       documentation and/or other materials provided with the distribution.
#     * Neither the name of Ajax.org B.V. nor the
#       names of its contributors may be used to endorse or promote products
#       derived from this software without specific prior written permission.
# 
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
# ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
# DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
# DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
# (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
# LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
# ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
# SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

###
The main class required to get started with searchreplace

@class BankToEldoradoFilter
###
define ['searchreplace/filter/filter', 'jquery'], (SRFilter, $) ->
  "use strict"

  class SRBankToEldoradoFilter extends SRFilter
    ###
    @param {*} input
    @returns {*}
    ###
    update: (input) ->
      lines = []
      $input = $(input)
      $lines = $input.find('tr')
      $lines.each (i)->
        return if i == 0

        $tr = $(@)

        data =
          'datecompta': $tr.find('td:eq(0) .itemFormReadOnly').text()
          'libelleop' : $tr.find('td:eq(1) .itemFormReadOnly').text()
          'ref'       : $tr.find('td:eq(2) .itemFormReadOnly').text()
          'dateope'   : $tr.find('td:eq(3) .itemFormReadOnly').text()
          'dateval'   : $tr.find('td:eq(4) .itemFormReadOnly').text()
          'debit'     : $tr.find('td:eq(5) .itemFormReadOnly').text()
          'credit'    : $tr.find('td:eq(6) .itemFormReadOnly').text()

        line = []
        $.map data, (v)->
          line.push(v)
        lines.push(line.join("\t"))

      lines.join("\n")

  SRBankToEldoradoFilter
