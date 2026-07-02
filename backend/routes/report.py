from fastapi import APIRouter

from services.report_generator import generate_report

router = APIRouter()


@router.post("/report")
def create_report():

    return generate_report()