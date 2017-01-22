class BaseSerializer
  def initialize(object)
    @object = object
  end

  def process_objects_group(objects_array, &block)
    data = []
    objects_array.each do |object|
      if object.try(:id)
        single_data = {}
        # Always try to return the object id for objects group
        single_data[:id] = object.id.to_s
        begin
          single_data.merge!(yield object)
        rescue => e
          puts "Error merging with block: #{e.message}"
        end if block_given?
      else
        # When object is a simple data
        single_data = object
        (single_data = yield(object)) if block_given?
      end
      data << single_data
    end
    data
  end

  def process_single_object(object, &block)
    data = {}
    if object.try(:id)
      # Always try to return the object id for single objects
      data[:id] = object.id.to_s if object.try(:id)
      begin
        data.merge!(yield object)
      rescue => e
        puts "Error merging with block: #{e.message}"
      end if block_given?
    else
      data = object
      (data = yield(object)) if block_given?
    end
    data
  end

  def object
    @object
  end

  def as_json(&block)
    if @object.nil?
      puts "WARNING: Object sent to serializer is nil. Returning empty hash"
      return {}
    end
    if @object.is_a?(Array)
      process_objects_group(@object) do |object|
        if block_given?
          yield object
        else
          begin
            object.attributes
          rescue => e
            object
          end
        end
      end
    else
      process_single_object(@object) do |object|
        if block_given?
          yield object
        else
          begin
            object.attributes
          rescue => e
            object
          end
        end
      end
    end
  end
end