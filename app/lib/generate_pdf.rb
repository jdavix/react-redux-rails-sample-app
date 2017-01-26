module GeneratePdf
  def self.generate_report(items)

    file_name = "tickets_report.pdf"

    ab = ApplicationController.new()
    ab.instance_variable_set(:@items, items)
    pdf_string = WickedPdf.new.pdf_from_string(
      ab.render_to_string("reports/tickets.html.erb",
        :layout => false,
      ),
      :pdf => file_name,
      :header => { :right => '[page] of [topage]' },
      :layout => false,
      :page_size => 'Letter',
      :lowquality => false,
      :handlers => [:erb],
      :formats => [:html],
      :margin => {:top                => 5,
                  :bottom             => 0,
                  :left               => 0,
                  :right              => 0},
      :orientation => 'Portrait',
      :disposition => 'attachment'
    )

    file = File.open(Rails.root.join("public/#{file_name}"), 'w')
    file.binmode
    file.write pdf_string
    file.close
    return "/#{file_name}"
  end
end