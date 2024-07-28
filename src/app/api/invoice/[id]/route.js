import { NextResponse } from 'next/server';
import prisma from '../..//../../util/prisma'
// Get category by ID
export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id, 10);
    const category = await prisma.Invoices.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        { message: 'Invoice not found', status: false },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error fetching Invoice:', error);
    return NextResponse.json(
      { message: 'Failed to fetch Invoice', status: false, error: error.message },
      { status: 500 }
    );
  }
}

// Update an existing category
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const {
        CustomerName,
        VATNumber,
        PostalAddress,
        StreetName,
        BuildingNumber,
        Plotno,
        CitysubdivisionName,
        CityName,
        PostalZone,
        Country,
        CompanyName,
        TaxNumber,
        InvoiceNumber,
        TaxAmount,
        TaxwithTotal
      } = await request.json();
    const updatedCategory = await prisma.Invoices.update({
      where: { id: parseInt(id) },
      data: {
        CustomerName,
        VATNumber,
        PostalAddress,
        StreetName,
        BuildingNumber,
        Plotno,
        CitysubdivisionName,
        CityName,
        PostalZone,
        Country,
        CompanyName,
        TaxNumber,
        InvoiceNumber,
        DocumentDate: new Date(),
        TaxAmount,
        TaxwithTotal
      },
    });
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Error updating Invoice:', error);
    return NextResponse.json(
      {
        message: 'Failed to update Invoice',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Delete a category
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await prisma.Invoices.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting Invoice:', error);
    return NextResponse.json(
      {
        message: 'Failed to delete Invoice',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
