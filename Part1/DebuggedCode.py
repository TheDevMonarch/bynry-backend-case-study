@app.route('/api/products', methods=['POST'])
def create_product():
    
    data = request.get_json()

    # Checking if any data is missing or not
    required_fields = ['name', 'sku', 'price', 'warehouse_id', 'initial_quantity']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    try:
        # Checking for unique SKU
        existing_product = Product.query.filter_by(sku=data['sku']).first()
        if existing_product:
            return jsonify({"error": "SKU already exists"}), 409

        product = Product(
            name=data['name'],
            sku=data['sku'],
            price=data['price'],
            warehouse_id=data['warehouse_id']
        )
        db.session.add(product)
        db.session.flush()  # This saves product.id without final commit

        
        inventory = Inventory(
            product_id=product.id,
            warehouse_id=data['warehouse_id'],
            quantity=data['initial_quantity']
        )
        db.session.add(inventory)

        #Only one commit instead of two to ensure data consistency
        db.session.commit()

        
        return jsonify({
            "message": "Product created successfully",
            "product_id": product.id
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": "An error occurred while creating product",
            "details": str(e)
        }), 500